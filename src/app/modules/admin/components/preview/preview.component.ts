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
import { OperationState } from '../../../../models/operation-state.enum';

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
            this.populateFormWithInputs(this.model.fields);
        });
    }

    addField(): void {
        const drawer = this.drawerService.create({
            nzContent: AddFieldComponent,
            nzContentParams: { model: this.model },
            nzTitle: 'Новое поле',
            ...DRAWER_BASE_CONFIG,
        });

        drawer.afterOpen.subscribe(() => {
            const instance = drawer.getContentComponent();
            instance.create.subscribe(f => {
                drawer.close();
                this.onEdit(f);
            });
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        const paramFields = this.model.fields.filter(field => field.section === 'params');
        moveItemInArray(paramFields, event.previousIndex, event.currentIndex);
        paramFields.forEach((field: FieldEntity, index: number) => (field.order = index + 1));
        const responseObservables = paramFields.map(field => this.fieldService.updateField(field.id, field));
        this.populateFormWithInputs(this.model.fields);
        forkJoin(responseObservables).pipe(takeUntil(this.destroy$)).subscribe();
    }

    private populateFormWithInputs(fields: FieldEntity[]): void {
        if (this.fieldsFormContainerRef) {
            this.fieldsFormContainerRef.clear();
        }
        fields.sort((a: FieldEntity, b: FieldEntity) => a.order - b.order);
        fields.forEach(field => this.resolveFieldComponent(field));
    }

    private resolveFieldComponent(field: FieldEntity): void {
        const resolver = this.componentFactoryResolver.resolveComponentFactory(PreviewToolsComponent);
        const component = this.fieldsFormContainerRef.createComponent(resolver);
        component.instance.field = field;
        component.instance.edit.subscribe(f => this.onEdit(f));
        component.instance.delete.subscribe(f => this.onDelete(f));
        component.changeDetectorRef.detectChanges();
    }

    private onEdit(field: FieldEntity): void {
        const service = this.dynamicFieldService.getService(field.type);
        if (!service) {
            return;
        }

        const drawer = this.drawerService.create<FieldSettingsComponent>({
            nzContent: FieldSettingsComponent,
            nzTitle: service.getFieldName(),
            nzContentParams: { field },
            ...DRAWER_BASE_CONFIG,
        });

        drawer.afterOpen.subscribe(() => {
            const instance = drawer.getContentComponent();
            instance.fieldChange.subscribe(state => {
                if (state === OperationState.SUCCESS) {
                    drawer.close();
                    this.update();
                }
            });
        });
    }

    private onDelete(field: FieldEntity): void {
        this.fieldService.deleteField(field.id).subscribe(() => this.update());
    }
}
