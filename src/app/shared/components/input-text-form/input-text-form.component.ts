import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { AdvertFieldBase, ParamsInputText } from '../../models/models.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-form.component.html',
    styleUrls: ['./input-text-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextFormComponent extends FieldFormComponent<ParamsInputText> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        const valueValidators = [];
        if (this.field.params && this.field.params.required) {
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
