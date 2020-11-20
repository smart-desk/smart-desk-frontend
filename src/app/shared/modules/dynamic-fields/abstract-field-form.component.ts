import { Directive, Input } from '@angular/core';
import { Field } from '../../models/dto/field.entity';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFormComponent<T> {
    @Input() field: Field;
    @Input() preview: boolean;
    @Input() data: T;

    abstract getFieldData(): T;
    abstract isFieldDataValid(): boolean;
}
