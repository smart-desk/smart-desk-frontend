import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { InputTextFormComponent } from './input-text-form/input-text-form.component';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { AbstractFieldParamsComponent } from '../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { InputTextParamsComponent } from './input-text-params/input-text-params.component';

@Injectable()
export class InputTextService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<unknown>> {
        return this.componentFactoryResolver.resolveComponentFactory(InputTextFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(InputTextParamsComponent);
    }

    getName(): string {
        return 'Input Text';
    }
}
