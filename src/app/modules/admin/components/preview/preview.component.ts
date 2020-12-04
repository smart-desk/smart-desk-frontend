import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldService, ModelService } from '../../../../shared/services';
import { Section } from '../../../../shared/models/dto/section.entity';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { PreviewToolsComponent } from '../preview-tools/preview-tools.component';
import { FieldSettingsComponent } from '../field-settings/field-settings.component';
import { AddFieldComponent } from '../add-field/add-field.component';
import { Model } from '../../../../shared/models/dto/model.entity';

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
export class PreviewComponent implements OnInit {
    @Input()
    modelId: string;

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    private model: Model;

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

    private populateFormWithInputs(sections: Section[]): void {
        sections.forEach(section => {
            if (section.fields) {
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
}
