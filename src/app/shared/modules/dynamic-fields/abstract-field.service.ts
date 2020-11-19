import { ComponentFactory } from '@angular/core';
import { AbstractFieldFormComponent } from './abstract-field-form.component';
import { AbstractFieldParamsComponent } from './abstract-field-params.component';

export abstract class AbstractFieldService {
    /**
     * Returns customer for field
     */
    abstract getFormComponent(): ComponentFactory<AbstractFieldFormComponent<unknown>>; // todo remove generic

    /**
     * Returns customer for field
     */
    abstract getParamsComponent(): ComponentFactory<AbstractFieldParamsComponent<unknown>>; // todo remove generic maybe

    /**
     * Returns hyman readable name
     */
    abstract getName(): string;
}
