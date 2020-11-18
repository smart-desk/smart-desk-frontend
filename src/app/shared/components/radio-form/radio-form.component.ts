import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldFormComponent } from '../field-form/field-form.component';
import { RadioDto } from '../../models/dto/field-params/radio.dto';
import { RadioEntity } from '../../models/dto/field-data/radio.entity';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-form.component.html',
    styleUrls: ['./radio-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFormComponent extends FieldFormComponent<RadioDto> implements OnInit {
    form: FormGroup;

    // todo backend returns 500 error if value is null
    ngOnInit(): void {
        this.form = new FormGroup({
            value: new FormControl(this.data && this.data.value),
        });
    }

    getValue(): any {
        if (this.data) {
            this.data.value = this.form.get('value').value;
            return this.data;
        }

        const advertField = new RadioEntity(); // todo
        advertField.value = this.form.get('value').value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isValid(): boolean {
        return this.form.valid;
    }
}
