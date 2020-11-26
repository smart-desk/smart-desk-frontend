import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { RadioFormComponent } from './radio-form/radio-form.component';
import { AbstractFieldParamsComponent } from '../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { RadioParamsComponent } from './radio-params/radio-params.component';

@Injectable()
export class RadioService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<any, any>> {
        return this.componentFactoryResolver.resolveComponentFactory(RadioFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(RadioParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<any> {
        return undefined;
    }

    getFieldName(): string {
        return 'Radio';
    }
}
