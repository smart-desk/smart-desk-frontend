import { ComponentFactory } from '@angular/core';
import { AbstractFieldFormComponent } from './abstract-field-form.component';
import { AbstractFieldParamsComponent } from './abstract-field-params.component';
import { AbstractFieldViewComponent } from './abstract-field-view.component';
import { AbstractFieldFilterComponent } from './abstract-field-filter.component';

export abstract class AbstractFieldService {
    /**
     * Returns component resolver for user part form
     * This component must be displayed when user creates and edits advert
     */
    abstract getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<any, any>> | null;

    /**
     * Returns component resolver for admin part form
     * This component must be displayed when admin edit model of adverts
     */
    abstract getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent> | null;

    /**
     * Returns component resolver for the final representation of the component
     */
    abstract getViewComponentResolver(): ComponentFactory<AbstractFieldViewComponent<any, any>> | null;

    /**
     * Returns component resolver for filter form
     */
    abstract getFilterComponentResolver(): ComponentFactory<AbstractFieldFilterComponent<any, any>> | null;

    /**
     * Returns human readable name of field
     */
    abstract getFieldName(): string;
}
