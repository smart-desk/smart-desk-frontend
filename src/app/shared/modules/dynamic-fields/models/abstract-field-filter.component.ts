import { Directive, Input } from '@angular/core';
import { Field } from '../../../models/field';
import { Filter } from './filter';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFilterComponent<TParams> {
    @Input() field: Field<any, TParams>;
    abstract getFilterValue(): Filter<any>;
}
