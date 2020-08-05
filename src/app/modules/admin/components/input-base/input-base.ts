import { Directive, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OperationState } from './operation-state.enum';
import { FieldWithData } from '../../../../shared/models/field-with-data';

@Directive()
export abstract class InputBaseDirective<T> implements OnDestroy {
    @Input() field: FieldWithData<T>;

    protected save$ = new Subject<OperationState>();
    protected delete$ = new Subject<InputBaseDirective<unknown>>();

    get onSave$(): Observable<OperationState> {
        return this.save$.asObservable();
    }

    get onDelete(): Observable<InputBaseDirective<unknown>> {
        return this.delete$.asObservable();
    }

    ngOnDestroy() {
        this.delete$.complete();
        this.save$.complete();
    }
}
