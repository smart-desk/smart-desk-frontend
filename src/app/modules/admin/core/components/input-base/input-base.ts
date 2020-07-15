import { Input } from '@angular/core';
import { Field } from '../../../../../core/models/models.dto';
import { Observable } from 'rxjs';

export enum OperationState {
    LOADING,
    ERROR,
    SUCCESS,
}

export abstract class InputBase {
    // Must be an angular Input
    public field: Field;

    // Must be an angular Input
    public data: any;

    public abstract onSave$(): Observable<OperationState>;
}
