import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../models/abstract-field.service';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotoParamsComponent } from './photo-params/photo-params.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';

@Injectable()
export class PhotoService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<PhotoFormComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PhotoFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<PhotoParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PhotoParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<PhotoViewComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(PhotoViewComponent);
    }

    getFieldName(): string {
        return 'Фотогалерея';
    }

    getFilterComponentResolver(): null {
        return null;
    }
}
