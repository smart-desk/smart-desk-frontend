import { Directive, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FieldEntity } from '../../../models/dto/field.entity';
import { OperationState } from '../../../models/operation-state.enum';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldParamsComponent implements OnDestroy {
    // todo it should be generic
    @Input() field: FieldEntity;

    protected save$ = new Subject<OperationState>();
    protected delete$ = new Subject<AbstractFieldParamsComponent>();

    get onSave$(): Observable<OperationState> {
        return this.save$.asObservable();
    }

    ngOnDestroy() {
        this.delete$.complete();
        this.save$.complete();
    }
}
