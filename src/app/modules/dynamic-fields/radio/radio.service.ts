import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { RadioFormComponent } from './radio-form/radio-form.component';
import { RadioParamsComponent } from './radio-params/radio-params.component';
import { AbstractFieldViewComponent } from '../../../shared/modules/dynamic-fields/abstract-field-view.component';
import { RadioEntity } from '../../../shared/models/dto/field-data/radio.entity';
import { RadioParamsDto } from '../../../shared/models/dto/field-data/radio-params.dto';
import { RadioViewComponent } from './radio-view/radio-view.component';

@Injectable()
export class RadioService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<RadioFormComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(RadioFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<RadioParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(RadioParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<AbstractFieldViewComponent<RadioEntity, RadioParamsDto>> {
        return this.componentFactoryResolver.resolveComponentFactory(RadioViewComponent);
    }

    getFilterComponentResolver(): ComponentFactory<any> { // todo set generic
        return null;
    }

    getFieldName(): string {
        return 'Radio';
    }
}
