import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTextDto } from '../../models/dto/field-params/input-text.dto';
import { InputTextEntity } from '../../models/dto/field-data/input-text.entity';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-form.component.html',
    styleUrls: ['./input-text-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextFormComponent extends FieldFormComponent<InputTextDto> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        const valueValidators = [];
        if (this.field.params && (this.field.params as InputTextDto).required) {
            // todo
            valueValidators.push(Validators.required);
        }

        this.form = new FormGroup({
            value: new FormControl(this.data && this.data.value, valueValidators),
        });
    }

    getValue(): any {
        if (this.data) {
            this.data.value = this.form.get('value').value;
            return this.data;
        }

        const advertField = new InputTextEntity();
        advertField.value = this.form.get('value').value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isValid(): boolean {
        return this.form.valid;
    }
}
