import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTextEntity } from '../../../../shared/models/dto/field-data/input-text.entity';
import { InputTextParamsDto } from '../../../../shared/models/dto/field-data/input-text-params.dto';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-form.component.html',
    styleUrls: ['./input-text-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextFormComponent extends AbstractFieldFormComponent<InputTextEntity> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        const valueValidators = [];
        const params = this.field.params as InputTextParamsDto;
        if (params && params.required) {
            valueValidators.push(Validators.required);
        }

        this.form = new FormGroup({
            value: new FormControl(this.data && this.data.value, valueValidators),
        });
    }

    getFieldData(): any {
        if (this.data) {
            this.data.value = this.form.get('value').value;
            return this.data;
        }

        const advertField = new InputTextEntity();
        advertField.value = this.form.get('value').value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isFieldDataValid(): boolean {
        return this.form.valid;
    }
}
