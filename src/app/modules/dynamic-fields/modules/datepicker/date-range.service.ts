import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../models/abstract-field.service';
import { AbstractFieldFilterComponent } from '../../models/abstract-field-filter.component';
import { AbstractFieldViewComponent } from '../../models/abstract-field-view.component';
import { AbstractFieldParamsComponent } from '../../models/abstract-field-params.component';
import { AbstractFieldFormComponent } from '../../models/abstract-field-form.component';
import { DatepickerParamsComponent } from './datepicker-params/datepicker-params.component';

@Injectable()
export class DateRangeService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFieldName(): string {
        return 'Datepicker';
    }

    getFilterComponentResolver(): ComponentFactory<AbstractFieldFilterComponent<any, any>> {
        return undefined;
    }

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<any, any>> {
        return undefined;
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(DatepickerParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<AbstractFieldViewComponent<any, any>> {
        return undefined;
    }
}
