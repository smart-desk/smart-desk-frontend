import { Directive, Input, OnDestroy } from '@angular/core';
import { Field } from '../../models/models.dto';

@Directive()
export abstract class InputBaseDirective<T> {
    @Input() field: Field;
    // todo data already in Field
    @Input() data: T;
    @Input() preview: boolean;
}
