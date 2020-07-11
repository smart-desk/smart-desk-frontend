import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
export class InputTextComponent {
    @Input() private data: IInputText = {};

    public inputTextForm = new FormGroup({
        label: new FormControl(this.data.label || ''),
        placeholder: new FormControl(this.data.placeholder || ''),
        required: new FormControl(this.data.required || false),
    });

    public getValue(): IInputText {
        return this.inputTextForm.getRawValue() as IInputText;
    }
}
