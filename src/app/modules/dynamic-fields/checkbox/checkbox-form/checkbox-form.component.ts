import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-form.component';
import { CheckboxEntity } from '../dto/checkbox.entity';
import { CheckboxParamsDto } from '../dto/checkbox-params.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './checkbox-form.component.html',
    styleUrls: ['./checkbox-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxFormComponent extends AbstractFieldFormComponent<CheckboxEntity, CheckboxParamsDto> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            value: new FormControl(this.field.data && this.field.data.value),
        });
    }

    getFieldData(): any {
        if (this.field.data) {
            this.field.data.value = this.form.get('value').value;
            return this.field.data;
        }

        const advertField = new CheckboxEntity();
        advertField.value = this.form.get('value').value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isFieldDataValid(): boolean {
        return this.form.valid;
    }
}
