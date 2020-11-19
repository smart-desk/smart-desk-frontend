import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { TextareaFormComponent } from './textarea-form/textarea-form.component';
import { AbstractFieldParamsComponent } from '../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { TextareaParamsComponent } from './textarea-params/textarea-params.component';

@Injectable()
export class TextareaService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponent(): ComponentFactory<AbstractFieldFormComponent<unknown>> {
        return this.componentFactoryResolver.resolveComponentFactory(TextareaFormComponent);
    }

    getParamsComponent(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(TextareaParamsComponent);
    }

    getName(): string {
        return 'Textarea';
    }
}
