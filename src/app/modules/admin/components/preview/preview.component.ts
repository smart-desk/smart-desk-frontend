import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { FieldService, ModelService } from '../../../../services';
import { Section } from '../../../../models/section/section.entity';
import { FieldEntity } from '../../../../models/field/field.entity';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { PreviewToolsComponent } from '../preview-tools/preview-tools.component';
import { FieldSettingsComponent } from '../field-settings/field-settings.component';
import { AddFieldComponent } from '../add-field/add-field.component';
import { Model } from '../../../../models/model/model.entity';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicFieldsService } from 'src/app/modules/dynamic-fields/dynamic-fields.service';

const DRAWER_BASE_CONFIG = {
    nzWidth: 400,
    nzMaskClosable: true,
};

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit, OnDestroy {
    @Input()
    modelId: string;
    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    private model: Model;
    private destroy$ = new Subject();

    constructor(
        private modelService: ModelService,
        private dynamicFieldService: DynamicFieldsService,
        private drawerService: NzDrawerService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private fieldService: FieldService
    ) {}

    ngOnInit(): void {
        this.update();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    update(): void {
        this.modelService.getModel(this.modelId).subscribe(model => {
            this.model = model;
            this.populateFormWithInputs(this.model.sections);
        });
    }

    addField(): void {
        const drawer = this.drawerService.create({
            nzContent: AddFieldComponent,
            nzContentParams: { model: this.model },
            nzTitle: 'New Field',
            ...DRAWER_BASE_CONFIG,
        });

        drawer.afterOpen.subscribe(() => {
            const instance = drawer.getContentComponent() as AddFieldComponent;
            instance.create.subscribe((f: FieldEntity) => {
                drawer.close();
                this.onEdit(f);
            });
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        const paramSection = this.model.sections.find(section => section.type === 'params') as Section;
        moveItemInArray(paramSection.fields, event.previousIndex, event.currentIndex);
        paramSection.fields.forEach((field: FieldEntity, index: number) => (field.order = index + 1));
        const responseObservables = paramSection.fields.map(field => this.fieldService.updateField(field.id, field));
        this.populateFormWithInputs(this.model.sections);
        forkJoin(responseObservables).pipe(takeUntil(this.destroy$)).subscribe();
    }

    private populateFormWithInputs(sections: Section[]): void {
        if (this.fieldsFormContainerRef) {
            this.fieldsFormContainerRef.clear();
        }
        sections.forEach(section => {
            if (section.fields) {
                section.fields.sort((a: FieldEntity, b: FieldEntity) => a.order - b.order);
                section.fields.forEach(field => {
                    this.resolveFieldComponent(field);
                });
            }
        });
    }

    private resolveFieldComponent(field: FieldEntity): void {
        const resolver = this.componentFactoryResolver.resolveComponentFactory(PreviewToolsComponent);
        const component = this.fieldsFormContainerRef.createComponent(resolver);
        component.instance.field = field;
        component.instance.edit.subscribe((f: FieldEntity) => this.onEdit(f));
        component.instance.delete.subscribe((f: FieldEntity) => this.onDelete(f));
        component.changeDetectorRef.detectChanges();
    }

    private onEdit(field: FieldEntity): void {
        const service = this.dynamicFieldService.getService(field.type);
        if (!service) {
            return;
        }

        const drawer = this.drawerService.create({
            nzContent: FieldSettingsComponent,
            nzTitle: service.getFieldName(),
            nzContentParams: { field },
            ...DRAWER_BASE_CONFIG,
        });

        drawer.afterOpen.subscribe(() => {
            const instance = drawer.getContentComponent() as FieldSettingsComponent;
            instance.fieldChange.subscribe(() => {
                drawer.close();
                this.update();
            });
        });
    }

    private onDelete(field: FieldEntity): void {
        this.fieldService.deleteField(field.id).subscribe(() => this.update());
    }
}
