import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        const valueValidators = [];
        if (this.field?.required) {
            valueValidators.push(Validators.required);
        }

        this.form = this.fb.group({
            value: [this.field?.data?.value, valueValidators],
        });
    }

    getFieldData(): InputTextEntity {
        if (this.field.data) {
            this.field.data.value = this.form.get('value')?.value;
            return this.field.data;
        }

        const productField = new InputTextEntity();
        productField.value = this.form.get('value')?.value;
        productField.fieldId = this.field.id;

        return productField;
    }

    isFieldDataValid(): boolean {
        return this.form.valid;
    }
}
