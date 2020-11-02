import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertFieldBase, ParamsTextarea } from '../../../../shared/models/models.dto';
import { FieldFormComponent } from '../../../../shared/components/field-form/field-form.component';

@Component({
    selector: 'app-textarea-view',
    templateUrl: './textarea-view.component.html',
    styleUrls: ['./textarea-view.component.scss'],
})
export class TextareaViewComponent extends FieldFormComponent<ParamsTextarea> implements OnInit {
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
