import { Directive, Input } from '@angular/core';
import { Filter } from './filter';
import { Field } from '../../../models/field/field';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFilterComponent<TParams, TFilter> {
    @Input() field: Field<any, TParams>;
    @Input() filter: Filter<TFilter>;
    abstract getFilterValue(): Filter<TFilter>;
    abstract dropFilters(): void;
}
