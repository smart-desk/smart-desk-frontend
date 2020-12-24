import { Directive, Input } from '@angular/core';
import { Field } from '../../models/field';

export interface FilterParams {
    fieldId: string;
    value: any;
}

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFilterComponent<TParams> {
    @Input() field: Field<any, TParams>;
    abstract getFilterValue(): FilterParams;
}
