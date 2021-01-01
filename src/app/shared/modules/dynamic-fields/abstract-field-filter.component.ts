import { Directive, Input } from '@angular/core';
import { Field } from '../../models/field';
import { Filters } from '../../models/dto/advert.dto';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFilterComponent<TParams> {
    @Input() field: Field<any, TParams>;
    abstract getFilterValue(): Filters;
}
