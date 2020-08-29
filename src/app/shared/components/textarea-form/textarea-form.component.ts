import { Component, OnInit } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { AdvertFieldBase, CreatorFieldTextarea } from '../../models/models.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea-form.component.html',
    styleUrls: ['./textarea-form.component.scss'],
})
export class TextareaFormComponent extends FieldFormComponent<CreatorFieldTextarea> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        const valueValidators = [];
        if (this.field.data && this.field.data.required) {
            valueValidators.push(Validators.required);
        }

        this.form = new FormGroup({
            value: new FormControl(this.advertField && this.advertField.value, valueValidators),
        });
    }

    getValue(): AdvertFieldBase {
        if (this.advertField) {
            this.advertField.value = this.form.get('value').value;
            return this.advertField;
        }

        const advertField = new AdvertFieldBase();
        advertField.value = this.form.get('value').value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isValid(): boolean {
        return this.form.valid;
    }
}
