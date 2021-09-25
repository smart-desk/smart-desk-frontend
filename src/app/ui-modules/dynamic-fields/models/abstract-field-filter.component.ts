import { Directive, Input } from '@angular/core';
import { Filter } from '../../../modules/product/models/filter';
import { Field } from '../../../modules/field/models/field';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFilterComponent<TParams, TFilter> {
    @Input() field: Field<any, TParams>;
    @Input() filter: Filter<TFilter> | null;
    destroy$ = new Subject();
    onFormChange$ = new Subject();
    form: FormGroup;
    abstract setFormValue(): void;
    abstract getFilterValue(): Filter<TFilter> | null;
    abstract dropFilters(): void;
    abstract getActiveFilters(): number;
}
