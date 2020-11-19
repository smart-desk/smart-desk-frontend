import { ComponentFactory } from '@angular/core';
import { AbstractFieldFormComponent } from './abstract-field-form.component';
import { AbstractFieldParamsComponent } from './abstract-field-params.component';

export abstract class AbstractFieldService {
    /**
     * Returns customer for field
     */
    abstract getFormComponentResolver(): ComponentFactory<AbstractFieldFormComponent<unknown>>; // todo remove generic

    /**
     * Returns customer for field
     */
    abstract getParamsComponentResolver(): ComponentFactory<AbstractFieldParamsComponent>;

    /**
     * Returns hyman readable name
     */
    abstract getFieldName(): string;
}
