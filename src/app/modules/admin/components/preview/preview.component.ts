import { ChangeDetectionStrategy, Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModelService } from '../../../../shared/services';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { Section } from '../../../../shared/models/dto/section.entity';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { Field } from '../../../../shared/models/field';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { FieldSettingsComponent } from '../field-settings/field-settings.component';

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

    constructor(
        private modelService: ModelService,
        private dynamicFieldService: DynamicFieldsService,
        private drawerService: NzDrawerService
    ) {}

    ngOnInit(): void {
        this.update();
    }

    update(): void {
        if (this.fieldsFormContainerRef) {
            this.fieldsFormContainerRef.clear();
        }
        this.modelService.getModel(this.modelId).subscribe(model => {
            this.populateFormWithInputs(model.sections);
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

    private resolveFieldComponent(field: FieldEntity): ComponentRef<AbstractFieldFormComponent<any, any>> {
        const service = this.dynamicFieldService.getService(field.type);
        if (!service) {
            return;
        }
        const resolver = service.getFormComponentResolver();
        const component = this.fieldsFormContainerRef.createComponent(resolver);
        component.instance.field = field;
        component.instance.preview = true;
        // todo no any
        if ((component.instance as any).edit$) {
            (component.instance as any).edit$.subscribe(res => this.openSettings(res));
        }
        component.changeDetectorRef.detectChanges();

        return component;
    }

    private openSettings(field: Field<any, any>) {
        const drawer = this.drawerService.create({
            nzContent: FieldSettingsComponent,
            nzContentParams: { field },
        });
    }
}
