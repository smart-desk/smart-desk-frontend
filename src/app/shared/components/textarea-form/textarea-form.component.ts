import { Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../modules/dynamic-fields/abstract-field-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextareaDto } from '../../models/dto/field-params/textarea.dto';
import { TextareaEntity } from '../../models/dto/field-data/textarea.entity';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea-form.component.html',
    styleUrls: ['./textarea-form.component.scss'],
})
export class TextareaFormComponent extends AbstractFieldFormComponent<TextareaDto> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        const valueValidators = [];
        if (this.field.params && (this.field.params as TextareaDto).required) {
            valueValidators.push(Validators.required);
        }

        this.form = new FormGroup({
            value: new FormControl(this.data && this.data.value, valueValidators),
        });
    }

    getValue(): any {
        // todo
        if (this.data) {
            this.data.value = this.form.get('value').value;
            return this.data;
        }

        const advertField = new TextareaEntity();
        advertField.value = this.form.get('value').value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isValid(): boolean {
        return this.form.valid;
    }
}
