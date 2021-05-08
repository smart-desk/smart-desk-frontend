import { Directive, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OperationState } from '../../../models/operation-state.enum';
import { Field } from "../../../models/field/field";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldParamsComponent<TParams> implements OnDestroy {
    @Input() field: Field<any, TParams>;

    protected save$ = new Subject<OperationState>();
    protected delete$ = new Subject<AbstractFieldParamsComponent<TParams>>();

    get onSave$(): Observable<OperationState> {
        return this.save$.asObservable();
    }

    ngOnDestroy() {
        this.delete$.complete();
        this.save$.complete();
    }
}
