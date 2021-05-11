import { ComponentRef, Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractFieldFormComponent } from '../../dynamic-fields/models/abstract-field-form.component';
import { DynamicFieldsService } from '../../dynamic-fields/dynamic-fields.service';
import { Section } from '../../../models/section/section.entity';
import { FieldEntity } from '../../../models/field/field.entity';

@Injectable()
export abstract class AdvertFormBaseClass {
    formDefaultFields: FormGroup;
    @ViewChild('fields', { read: ViewContainerRef })
    protected fieldsFormContainerRef: ViewContainerRef;
    protected components: ComponentRef<AbstractFieldFormComponent<any, any>>[] = [];

    constructor(protected dynamicFieldService: DynamicFieldsService) {}

    protected populateFormWithInputs(sections: Section[]): void {
        sections.forEach(section => {
            if (section.fields) {
                section.fields.forEach(field => {
                    const component = this.resolveFieldComponent(field);
                    if (component) {
                        this.components.push(component);
                    }
                });
            }
        });
    }

    protected resolveFieldComponent(field: FieldEntity): ComponentRef<AbstractFieldFormComponent<any, any>> | null {
        const service = this.dynamicFieldService.getService(field.type);
        if (!service) {
            return null;
        }
        const resolver = service.getFormComponentResolver();

        if (resolver) {
            const component = this.fieldsFormContainerRef.createComponent(resolver);

            // add inputs
            component.instance.field = field;

            // run onInit
            component.changeDetectorRef.detectChanges();

            return component;
        } else {
            return null;
        }
    }

    protected isValid(): boolean {
        if (!this.formDefaultFields.valid) {
            return false;
        }
        return this.components.every(component => component.instance.isFieldDataValid());
    }
}
