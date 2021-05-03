import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../models/abstract-field.service';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationParamsComponent } from './location-params/location-params.component';
import { LocationViewComponent } from './location-view/location-view.component';
import { LocationFilterComponent } from './location-filter/location-filter.component';

@Injectable()
export class LocationService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<LocationFormComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(LocationFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<LocationParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(LocationParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<LocationViewComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(LocationViewComponent);
    }

    getFilterComponentResolver(): ComponentFactory<LocationFilterComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(LocationFilterComponent);
    }

    getFieldName(): string {
        return 'Location';
    }
}
