import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../models/abstract-field.service';
import { TextareaFormComponent } from './textarea-form/textarea-form.component';
import { TextareaParamsComponent } from './textarea-params/textarea-params.component';
import { TextareaViewComponent } from './textarea-view/textarea-view.component';

@Injectable()
export class TextareaService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<TextareaFormComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(TextareaFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<TextareaParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(TextareaParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<TextareaViewComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(TextareaViewComponent);
    }

    getFilterComponentResolver(): ComponentFactory<any> {
        // todo set generic
        return null;
    }

    getFieldName(): string {
        return 'Textarea';
    }
}
