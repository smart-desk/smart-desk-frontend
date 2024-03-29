import { Directive, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Field } from '../../../modules/field/models/field';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldParamsComponent<TParams> implements OnDestroy {
    @Input() field: Field<unknown, TParams>;

    protected delete$ = new Subject<AbstractFieldParamsComponent<TParams>>();

    abstract getField(): Field<unknown, TParams>;

    abstract isValid(): boolean;

    ngOnDestroy() {
        this.delete$.complete();
    }
}
