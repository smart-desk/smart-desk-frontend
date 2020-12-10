import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { AbstractFieldParamsComponent } from '../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { PriceEntity } from './dto/price.entity';
import { PriceParamsDto } from './dto/price-params.dto';
import { PriceFormComponent } from './price-form/price-form.component';
import { PriceParamsComponent } from './price-params/price-params.component';
import { PriceViewComponent } from './price-view/price-view.component';

@Injectable()
export class PriceService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<PriceEntity, PriceParamsDto>> {
        return this.componentFactoryResolver.resolveComponentFactory(PriceFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PriceParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<any> {
        return this.componentFactoryResolver.resolveComponentFactory(PriceViewComponent);
    }

    getFieldName(): string {
        return 'Price';
    }
}
