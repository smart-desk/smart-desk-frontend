import { ComponentRef, Directive, Input, ViewContainerRef, ViewRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Field } from '../../../../../core/models/models.dto';
import { OperationState } from './operation-state.enum';

@Directive()
export abstract class InputBaseDirective<T> {
    @Input() field: Field;
    @Input() data: T;

    protected save$ = new Subject<OperationState>();
    protected delete$ = new Subject<InputBaseDirective<unknown>>();

    get onSave$(): Observable<OperationState> {
        return this.save$.asObservable();
    }

    get onDelete(): Observable<InputBaseDirective<unknown>> {
        return this.delete$.asObservable();
    }
}
