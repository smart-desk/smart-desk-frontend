import { Directive, Input } from '@angular/core';
import { Field } from '../../models/field';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldViewComponent<T, K> {
    @Input() field: Field<T, K>;
    @Input() preview: boolean;
}
