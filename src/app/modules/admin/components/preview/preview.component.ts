import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ModelService } from '../../../../shared/services';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { Section } from '../../../../shared/models/dto/section.entity';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';

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
        private componentFactoryResolver: ComponentFactoryResolver,
        private dynamicFieldService: DynamicFieldsService
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
        component.changeDetectorRef.detectChanges();

        return component;
    }
}
