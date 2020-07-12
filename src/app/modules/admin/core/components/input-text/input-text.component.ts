import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreatorFieldInputText, Field } from '../../../../../core/models/models.dto';
import { InputBase, OperationState } from '../input-base/input-base';
import { Observable, Subject } from 'rxjs';

export interface IInputText {
    id?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
}

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent extends InputBase {
    @Input() public data: Partial<CreatorFieldInputText> = {};
    @Input() public field: Field;

    public OperationState = OperationState;
    public state: OperationState;

    public inputTextForm = new FormGroup({
        label: new FormControl(this.data.label || ''),
        placeholder: new FormControl(this.data.placeholder || ''),
        required: new FormControl(this.data.required || false),
    });

    private save$ = new Subject<OperationState>();

    constructor() {
        super();
    }

    public onSave$(): Observable<OperationState> {
        return this.save$.asObservable();
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        // todo add service call
        if (!this.data.id) {
            console.log('Create new field with id: ', this.field.id);
            console.log('Value', this.inputTextForm.getRawValue());
            this.state = OperationState.SUCCESS;
        } else {
            console.log('Update existing input with id: ', this.data.id);
            console.log('Value', this.inputTextForm.getRawValue());
            this.state = OperationState.SUCCESS;
        }
        setTimeout(() => this.save$.next(this.state), 1500);
    }
}
