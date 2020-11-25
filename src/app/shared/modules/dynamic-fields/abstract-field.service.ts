import { ComponentFactory } from '@angular/core';
import { AbstractFieldFormComponent } from './abstract-field-form.component';
import { AbstractFieldParamsComponent } from './abstract-field-params.component';

export abstract class AbstractFieldService {
    /**
     * Returns component resolver for user part form
     * This component must be displayed when user creates and edits advert
     */
    abstract getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<any, any>>; // todo remove generic

    /**
     * Returns component resolver for admin part form
     * This component must be displayed when admin edit model of adverts
     */
    abstract getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent>;

    /**
     * Returns human readable name of field
     */
    abstract getFieldName(): string;
}
