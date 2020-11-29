import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { TextFormComponent } from './text-form/text-form.component';
import { AbstractFieldParamsComponent } from '../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { TextParamsComponent } from './text-params/text-params.component';

@Injectable()
export class TextService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<any, any>> {
        return this.componentFactoryResolver.resolveComponentFactory(TextFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(TextParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<any> {
        return undefined;
    }

    getFieldName(): string {
        return 'Text';
    }
}