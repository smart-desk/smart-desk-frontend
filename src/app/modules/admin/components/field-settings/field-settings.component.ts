import { Directive, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OperationState } from './operation-state.enum';
import { Field } from '../../../../shared/models/dto/field.entity';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class FieldSettingsComponent<T> implements OnDestroy {
    @Input() field: Field;

    protected save$ = new Subject<OperationState>();
    protected delete$ = new Subject<FieldSettingsComponent<unknown>>();

    get onSave$(): Observable<OperationState> {
        return this.save$.asObservable();
    }

    get onDelete(): Observable<FieldSettingsComponent<unknown>> {
        return this.delete$.asObservable();
    }

    ngOnDestroy() {
        this.delete$.complete();
        this.save$.complete();
    }
}
