import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { CheckboxEntity } from '../dto/checkbox.entity';
import { CheckboxParamsDto } from '../dto/checkbox-params.dto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

type Checkboxes = Array<Checkbox>;
interface Checkbox {
    label: string;
    value: string;
    checked?: boolean;
}

function checkboxRequired(c: FormControl) {
    if (c.value?.every((v: Checkbox) => !v.checked)) {
        return {
            checkboxRequired: { valid: false },
        };
    }
    return null;
}

@Component({
    selector: 'app-checkbox-form',
    templateUrl: './checkbox-form.component.html',
    styleUrls: ['./checkbox-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxFormComponent extends AbstractFieldFormComponent<CheckboxEntity, CheckboxParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        const valueValidators = [];
        if (this.field?.required) {
            valueValidators.push(checkboxRequired);
        }

        this.form = this.fb.group({
            value: [this.getCheckboxes(), valueValidators],
        });
    }

    getFieldData(): any {
        if (this.field.data) {
            this.field.data.value = this.form
                .get('value')
                ?.value?.filter((v: Checkbox) => v.checked)
                ?.map((v: Checkbox) => v.value);
            return this.field.data;
        }

        const productField = new CheckboxEntity();
        productField.value = this.form
            .get('value')
            ?.value?.filter((v: Checkbox) => v.checked)
            ?.map((v: Checkbox) => v.value);
        productField.fieldId = this.field.id;

        return productField;
    }

    isFieldDataValid(): boolean {
        this.form.markAllAsTouched();
        this.form.get('value')?.updateValueAndValidity({ emitEvent: true });

        return this.form.valid;
    }

    getCheckboxes(): Checkboxes {
        return this.field?.params?.checkboxes?.map(cb => {
            return {
                label: cb.label,
                value: cb.value,
                checked: this.field?.data?.value?.includes(cb.value),
            };
        });
    }
}
