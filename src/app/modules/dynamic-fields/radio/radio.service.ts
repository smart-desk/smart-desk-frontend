import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { RadioFormComponent } from './radio-form/radio-form.component';
import { AbstractFieldParamsComponent } from '../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { RadioParamsComponent } from './radio-params/radio-params.component';
import { AbstractFieldViewComponent } from '../../../shared/modules/dynamic-fields/abstract-field-view.component';
import { RadioEntity } from '../../../shared/models/dto/field-data/radio.entity';
import { RadioParamsDto } from '../../../shared/models/dto/field-data/radio-params.dto';
import { RadioViewComponent } from './radio-view/radio-view.component';

@Injectable()
export class RadioService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<RadioEntity, RadioParamsDto>> {
        return this.componentFactoryResolver.resolveComponentFactory(RadioFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(RadioParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<AbstractFieldViewComponent<RadioEntity, RadioParamsDto>> {
        return this.componentFactoryResolver.resolveComponentFactory(RadioViewComponent);
    }

    getFieldName(): string {
        return 'Radio';
    }
}
