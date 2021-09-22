import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
        const valueValidators = [Validators.maxLength(1000)];
        if (this.field?.required) {
            valueValidators.push(Validators.required);
        }

        this.form = new FormGroup({
            value: new FormControl(this.field.data && this.field.data.value, valueValidators),
        });
    }

    getFieldData(): any {
        if (this.field.data) {
            this.field.data.value = this.form.get('value')?.value;
            return this.field.data;
        }

        const productField = new TextareaEntity();
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
