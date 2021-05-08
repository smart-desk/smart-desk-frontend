import { Directive, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Field } from '../../../models/field/field';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldParamsComponent<TParams> implements OnDestroy {
    @Input() field: Field<any, TParams>;
    @Output() save = new EventEmitter<Field<any, TParams>>();

    protected delete$ = new Subject<AbstractFieldParamsComponent<TParams>>();

    abstract getField(): Field<any, TParams>;

    ngOnDestroy() {
        this.delete$.complete();
    }
}
