import { Directive, Input } from '@angular/core';
import { Filter } from '../../../services/advert/models/filter';
import { Field } from '../../../services/field/models/field';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFilterComponent<TParams, TFilter> {
    @Input() field: Field<any, TParams>;
    @Input() filter: Filter<TFilter> | null;
    abstract getFilterValue(): Filter<TFilter> | null;
    abstract dropFilters(): void;
}
