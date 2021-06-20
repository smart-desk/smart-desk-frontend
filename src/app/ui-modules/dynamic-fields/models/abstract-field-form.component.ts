import { Directive, Input } from '@angular/core';
import { Field } from '../../../modules/field/models/field';
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFormComponent<T, K> {
    @Input() field: Field<T, K>;
    @Input() preview: boolean;

    abstract getFieldData(): T;
    abstract isFieldDataValid(): boolean;
}
