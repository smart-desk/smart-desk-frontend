import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { TextareaFormComponent } from './textarea-form/textarea-form.component';
import { AbstractFieldParamsComponent } from '../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { TextareaParamsComponent } from './textarea-params/textarea-params.component';

@Injectable()
export class TextareaService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<any, any>> {
        return this.componentFactoryResolver.resolveComponentFactory(TextareaFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(TextareaParamsComponent);
    }

    getFieldName(): string {
        return 'Textarea';
    }
}
