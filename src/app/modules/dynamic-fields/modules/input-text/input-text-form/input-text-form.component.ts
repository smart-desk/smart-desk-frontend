import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTextEntity } from '../dto/input-text.entity';
import { InputTextParamsDto } from '../dto/input-text-params.dto';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-form.component.html',
    styleUrls: ['./input-text-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextFormComponent extends AbstractFieldFormComponent<InputTextEntity, InputTextParamsDto> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        const valueValidators = [];
        const params = this.field.params;
        if (params && params.required) {
            valueValidators.push(Validators.required);
        }

        this.form = new FormGroup({
            value: new FormControl(this.field.data && this.field.data.value, valueValidators),
        });
    }

    getFieldData(): InputTextEntity {
        if (this.field.data) {
            this.field.data.value = (this.form.get('value') as FormControl).value;
            return this.field.data;
        }

        const advertField = new InputTextEntity();
        advertField.value = (this.form.get('value') as FormControl).value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isFieldDataValid(): boolean {
        return this.form.valid;
    }
}
