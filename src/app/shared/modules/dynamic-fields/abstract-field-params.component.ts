import { Directive, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Field } from '../../models/dto/field.entity';
import { OperationState } from '../../models/operation-state.enum';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldParamsComponent implements OnDestroy {
    @Input() field: Field;

    protected save$ = new Subject<OperationState>();
    protected delete$ = new Subject<AbstractFieldParamsComponent>();

    get onSave$(): Observable<OperationState> {
        return this.save$.asObservable();
    }

    get onDelete(): Observable<AbstractFieldParamsComponent> {
        return this.delete$.asObservable();
    }

    ngOnDestroy() {
        this.delete$.complete();
        this.save$.complete();
    }
}
