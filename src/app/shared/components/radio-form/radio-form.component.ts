import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldFormComponent } from '../field-form/field-form.component';
import { AdvertFieldBase, CreatorFieldRadio } from '../../models/models.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-form.component.html',
    styleUrls: ['./radio-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFormComponent extends FieldFormComponent<CreatorFieldRadio[]> implements OnInit {
    form: FormGroup;

    // todo backend returns 500 error if value is null
    ngOnInit(): void {
        this.form = new FormGroup({
            value: new FormControl(this.advertField && this.advertField.value),
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
