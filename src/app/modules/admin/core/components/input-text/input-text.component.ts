import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreatorFieldInputText, Field } from '../../../../../core/models/models.dto';
import { InputBase, OperationState } from '../input-base/input-base';
import { Observable, Subject } from 'rxjs';
import { CreatorFieldInputTextService } from '../../../../../core/services/creator/input-text';

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

    constructor(private creatorFieldInputTextService: CreatorFieldInputTextService) {
        super();
    }

    public onSave$(): Observable<OperationState> {
        return this.save$.asObservable();
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        const input: CreatorFieldInputText = this.inputTextForm.getRawValue();
        input.field_id = this.field.id;

        let request: Observable<CreatorFieldInputText>;

        if (!this.data.id) {
            this.state = OperationState.SUCCESS;
            request = this.creatorFieldInputTextService.createInputText(input);
        } else {
            request = this.creatorFieldInputTextService.updateInputText(this.data.id, input);
            this.state = OperationState.SUCCESS;
        }

        request.subscribe(res => {
            this.data = res;
            this.save$.next(this.state);
        });
    }
}
