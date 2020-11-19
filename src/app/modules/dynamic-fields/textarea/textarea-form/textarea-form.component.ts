import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextareaDto } from '../../../../shared/models/dto/field-params/textarea.dto';
import { TextareaEntity } from '../../../../shared/models/dto/field-data/textarea.entity';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea-form.component.html',
    styleUrls: ['./textarea-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaFormComponent extends AbstractFieldFormComponent<TextareaEntity> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        const params = this.field.params as TextareaDto;
        const valueValidators = [];
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

        const advertField = new TextareaEntity();
        advertField.value = this.form.get('value').value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isFieldDataValid(): boolean {
        return this.form.valid;
    }
}
