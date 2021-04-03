import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { FieldService, ModelService } from '../../../../shared/services';
import { Section } from '../../../../shared/models/dto/section.entity';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { PreviewToolsComponent } from '../preview-tools/preview-tools.component';
import { FieldSettingsComponent } from '../field-settings/field-settings.component';
import { AddFieldComponent } from '../add-field/add-field.component';
import { Model } from '../../../../shared/models/dto/model.entity';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    sort;

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    private model: Model;
    private destroy$ = new Subject();

    constructor(
        private modelService: ModelService,
        private dynamicFieldService: DynamicFieldsService,
        private drawerService: NzDrawerService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private fieldService: FieldService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.update();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    update(): void {
        if (this.fieldsFormContainerRef) {
            this.fieldsFormContainerRef.clear();
        }
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
            const instance = drawer.getContentComponent();
            instance.create.subscribe(f => {
                drawer.close();
                this.onEdit(f);
            });
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        const paramSection = this.model.sections.find(section => section.type === 'params');
        moveItemInArray(paramSection.fields, event.previousIndex, event.currentIndex);
        this.model.sections.forEach(section => {
            if (section.type === 'params') {
                section.fields = paramSection.fields;
            }
        });

        const fields = this.setOrder(paramSection.fields, event.previousIndex, event.currentIndex);
        const responseObservables = fields.map(field => this.fieldService.updateField(field.id, field));

        forkJoin(responseObservables)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.update());
        this.cd.detectChanges();
    }

    private populateFormWithInputs(sections: Section[]): void {
        sections.forEach(section => {
            if (section.fields) {
                section.fields.sort((a: FieldEntity, b: FieldEntity) => {
                    if (a.order < b.order) {
                        return -1;
                    }
                    if (a.order > b.order) {
                        return 1;
                    }
                    return 0;
                });
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
        component.instance.edit.subscribe(f => this.onEdit(f));
        component.instance.delete.subscribe(f => this.onDelete(f));
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
            const instance = drawer.getContentComponent();
            instance.fieldChange.subscribe(() => {
                drawer.close();
                this.update();
            });
        });
    }

    private onDelete(field: FieldEntity): void {
        this.fieldService.deleteField(field.id).subscribe(() => this.update());
    }

    private setOrder(fields: FieldEntity[], previousIndex: number, currentIndex: number): FieldEntity[] {
        fields.sort((a: FieldEntity, b: FieldEntity) => {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            return 0;
        });

        for (let i = 0; fields.length > i; i++) {
            if (fields[i].order === null) {
                fields[i].order = i;
            }

            if (currentIndex < previousIndex) {
                if (currentIndex === i) {
                    fields[i].order += 1;
                    fields[previousIndex].order = currentIndex;
                }
                if (currentIndex < i && previousIndex > i) {
                    fields[i].order = i + 1;
                }
            } else {
                if (currentIndex === i) {
                    fields[i].order -= 1;
                    fields[previousIndex].order = currentIndex;
                }

                if (currentIndex < i && previousIndex > i) {
                    fields[i].order = i - 1;
                }
            }

            if (previousIndex < i) {
                fields[i].order = i;
            }

            if (currentIndex > i) {
                fields[i].order = i;
            }
        }

        return fields;
    }
}
