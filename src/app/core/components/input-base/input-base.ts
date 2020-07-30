import { Directive, Input } from '@angular/core';
import { FieldWithData } from '../../models/field-with-data';

@Directive()
export abstract class InputBaseDirective<T> {
    @Input() field: FieldWithData<T>;
    @Input() preview: boolean;
}
