import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { RadioEntity } from '../dto/radio.entity';
import { RadioParamsDto } from '../dto/radio-params.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-form.component.html',
    styleUrls: ['./radio-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFormComponent extends AbstractFieldFormComponent<RadioEntity, RadioParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        const validators = [];
        if (this.field.required) {
            validators.push(Validators.required);
        }

        this.form = this.fb.group({
            value: [this.field?.data?.value, validators],
        });
    }

    getFieldData(): any {
        if (this.field.data) {
            this.field.data.value = this.form.get('value')?.value;
            return this.field.data;
        }

        const productField = new RadioEntity();
        productField.value = this.form.get('value')?.value;
        productField.fieldId = this.field.id;

        return productField;
    }

    isFieldDataValid(): boolean {
        this.form.markAllAsTouched();
        this.form.get('value')?.updateValueAndValidity({ emitEvent: true });

        return this.form.valid;
    }
}
