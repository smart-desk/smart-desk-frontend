import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { InputTextFormComponent } from './input-text-form/input-text-form.component';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { AbstractFieldParamsComponent } from '../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { InputTextParamsComponent } from './input-text-params/input-text-params.component';
import { AbstractFieldViewComponent } from '../../../shared/modules/dynamic-fields/abstract-field-view.component';
import { InputTextEntity } from '../../../shared/models/dto/field-data/input-text.entity';
import { InputTextParamsDto } from '../../../shared/models/dto/field-data/input-text-params.dto';
import { InputTextViewComponent } from './input-text-view/input-text-view.component';

@Injectable()
export class InputTextService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<any, any>> {
        return this.componentFactoryResolver.resolveComponentFactory(InputTextFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(InputTextParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<AbstractFieldViewComponent<InputTextEntity, InputTextParamsDto>> {
        return this.componentFactoryResolver.resolveComponentFactory(InputTextViewComponent);
    }

    getFieldName(): string {
        return 'Input Text';
    }
}