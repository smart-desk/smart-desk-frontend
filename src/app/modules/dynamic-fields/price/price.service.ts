import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { PriceFormComponent } from './price-form/price-form.component';
import { PriceParamsComponent } from './price-params/price-params.component';
import { PriceViewComponent } from './price-view/price-view.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';

@Injectable()
export class PriceService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<PriceFormComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PriceFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<PriceParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PriceParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<PriceViewComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PriceViewComponent);
    }

    getFilterComponentResolver(): ComponentFactory<PriceFilterComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PriceFilterComponent);
    }

    getFieldName(): string {
        return 'Price';
    }
}
