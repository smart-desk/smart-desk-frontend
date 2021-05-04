import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../models/abstract-field.service';
import { AbstractFieldFilterComponent } from '../../models/abstract-field-filter.component';
import { AbstractFieldViewComponent } from '../../models/abstract-field-view.component';
import { AbstractFieldParamsComponent } from '../../models/abstract-field-params.component';
import { AbstractFieldFormComponent } from '../../models/abstract-field-form.component';
import { DatepickerParamsComponent } from './datepicker-params/datepicker-params.component';
import { DatepickerFormComponent } from './datepicker-form/datepicker-form.component';
import { DatepickerEntity } from './entities/datepicker.entity';
import { DatepickerParamsDto } from './dto/datepicker-params.dto';

@Injectable()
export class DatepickerService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFieldName(): string {
        return 'Datepicker';
    }

    getFilterComponentResolver(): ComponentFactory<AbstractFieldFilterComponent<any, any>> {
        return undefined;
    }

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<DatepickerEntity, DatepickerParamsDto>> {
        return this.componentFactoryResolver.resolveComponentFactory(DatepickerFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(DatepickerParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<AbstractFieldViewComponent<any, any>> {
        return undefined;
    }
}
