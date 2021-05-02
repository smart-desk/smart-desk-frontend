import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../models/abstract-field.service';
import { RadioFormComponent } from './radio-form/radio-form.component';
import { RadioParamsComponent } from './radio-params/radio-params.component';
import { AbstractFieldViewComponent } from '../../models/abstract-field-view.component';
import { RadioEntity } from './dto/radio.entity';
import { RadioParamsDto } from './dto/radio-params.dto';
import { RadioViewComponent } from './radio-view/radio-view.component';
import { RadioFilterComponent } from './radio-filter/radio-filter.component';

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

    getFilterComponentResolver(): ComponentFactory<RadioFilterComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(RadioFilterComponent);
    }

    getFieldName(): string {
        return 'Radio';
    }
}
