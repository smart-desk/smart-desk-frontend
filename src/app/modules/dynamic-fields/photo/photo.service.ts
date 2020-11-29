import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../../shared/modules/dynamic-fields/abstract-field.service';
import { AbstractFieldFormComponent } from '../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { AbstractFieldParamsComponent } from '../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { PhotoParamsComponent } from './photo-params/photo-params.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';

@Injectable()
export class PhotoService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<any, any>> {
        return this.componentFactoryResolver.resolveComponentFactory(PhotoFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PhotoParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<PhotoViewComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PhotoViewComponent);
    }

    getFieldName(): string {
        return 'Photo';
    }
}