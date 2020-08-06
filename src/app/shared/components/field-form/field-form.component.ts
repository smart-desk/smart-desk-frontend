import { Directive, Input } from '@angular/core';
import { FieldWithData } from '../../models/field-with-data';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class FieldFormComponent<T> {
    @Input() field: FieldWithData<T>;
    @Input() preview: boolean;
}
