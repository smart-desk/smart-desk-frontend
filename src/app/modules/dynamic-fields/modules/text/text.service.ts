import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../models/abstract-field.service';
import { TextFormComponent } from './text-form/text-form.component';
import { TextParamsComponent } from './text-params/text-params.component';

@Injectable()
export class TextService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<TextFormComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(TextFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<TextParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(TextParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<any> {
        return undefined;
    }

    getFilterComponentResolver(): ComponentFactory<null> {
        return null;
    }

    getFieldName(): string {
        return 'Text';
    }
}
