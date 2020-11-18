import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { InputTextFormComponent } from './input-text-form/input-text-form.component';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';

@Injectable()
export class InputTextService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponent(): ComponentFactory<AbstractFieldFormComponent<unknown>> {
        return this.componentFactoryResolver.resolveComponentFactory(InputTextFormComponent);
    }
}
