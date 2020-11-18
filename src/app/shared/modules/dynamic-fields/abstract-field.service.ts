import { ComponentFactory } from '@angular/core';
import { AbstractFieldFormComponent } from './abstract-field-form.component';

export abstract class AbstractFieldService {
    /**
     * Returns customer for field
     */
    public abstract getFormComponent(): ComponentFactory<AbstractFieldFormComponent<unknown>>; // todo remove generic
}
