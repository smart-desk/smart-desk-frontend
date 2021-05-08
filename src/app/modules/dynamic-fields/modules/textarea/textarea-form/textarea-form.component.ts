import { ChangeDetectionStrategy, Component, OnInit, EventEmitter } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextareaEntity } from '../dto/textarea.entity';
import { TextareaParamsDto } from '../dto/textarea-params.dto';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea-form.component.html',
    styleUrls: ['./textarea-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaFormComponent extends AbstractFieldFormComponent<TextareaEntity, TextareaParamsDto> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        const valueValidators = [];
        if (this.field?.required) {
            valueValidators.push(Validators.required);
        }

        this.form = new FormGroup({
            value: new FormControl(this.field.data && this.field.data.value, valueValidators),
        });
    }

    getFieldData(): any {
        if (this.field.data) {
            this.field.data.value = this.form.get('value').value;
            return this.field.data;
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
