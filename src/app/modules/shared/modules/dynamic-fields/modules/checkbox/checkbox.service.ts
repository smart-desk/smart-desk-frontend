import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractFieldService } from '../../models/abstract-field.service';
import { CheckboxFormComponent } from './checkbox-form/checkbox-form.component';
import { CheckboxParamsComponent } from './checkbox-params/checkbox-params.component';
import { AbstractFieldViewComponent } from '../../models/abstract-field-view.component';
import { CheckboxEntity } from './dto/checkbox.entity';
import { CheckboxParamsDto } from './dto/checkbox-params.dto';
import { CheckboxViewComponent } from './checkbox-view/checkbox-view.component';
import { CheckboxFilterComponent } from './checkbox-filter/checkbox-filter.component';

@Injectable()
export class CheckboxService implements AbstractFieldService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    getFormComponentResolver(): ComponentFactory<CheckboxFormComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(CheckboxFormComponent);
    }

    getParamsComponentResolver(): ComponentFactory<CheckboxParamsComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(CheckboxParamsComponent);
    }

    getViewComponentResolver(): ComponentFactory<AbstractFieldViewComponent<CheckboxEntity, CheckboxParamsDto>> {
        return this.componentFactoryResolver.resolveComponentFactory(CheckboxViewComponent);
    }

    getFilterComponentResolver(): ComponentFactory<CheckboxFilterComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(CheckboxFilterComponent);
    }

    getFieldName(): string {
        return 'Checkbox';
    }
}
