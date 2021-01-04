import { Directive, Input } from '@angular/core';
import { Field } from '../../../models/field';
import { Filter } from './filter';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFilterComponent<TParams, TFilter> {
    @Input() field: Field<any, TParams>;
    @Input() filter: Filter<TFilter>;
    abstract getFilterValue(): Filter<TFilter>;
    abstract dropFilters(): void;
}
