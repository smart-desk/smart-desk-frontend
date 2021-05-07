import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../models/abstract-field.service';
import { InputTextFormComponent } from './input-text-form/input-text-form.component';
import { InputTextParamsComponent } from './input-text-params/input-text-params.component';
import { InputTextViewComponent } from './input-text-view/input-text-view.component';

@Injectable()
export class InputTextService implements Partial<AbstractFieldService> {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<InputTextFormComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(InputTextFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<InputTextParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(InputTextParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<InputTextViewComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(InputTextViewComponent);
    }

    getFieldName(): string {
        return 'Input Text';
    }
}
