import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { RadioEntity } from '../../../../shared/models/dto/field-data/radio.entity';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-form.component.html',
    styleUrls: ['./radio-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFormComponent extends AbstractFieldFormComponent<RadioEntity> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            value: new FormControl(this.data && this.data.value),
        });
    }

    getFieldData(): any {
        if (this.data) {
            this.data.value = this.form.get('value').value;
            return this.data;
        }

        const advertField = new RadioEntity();
        advertField.value = this.form.get('value').value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isFieldDataValid(): boolean {
        return this.form.valid;
    }
}
