import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { InputTextParamsDto } from '../dto/input-text-params.dto';
import { Field } from '../../../../../modules/field/models/field';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-params.component.html',
    styleUrls: ['./input-text-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextParamsComponent extends AbstractFieldParamsComponent<InputTextParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: [this.field?.title || '', [Validators.required, Validators.maxLength(255)]],
            required: [this.field?.required || false],
            placeholder: [this.field?.params?.placeholder || ''],
        });
    }

    getField(): Field<unknown, InputTextParamsDto> {
        this.field.title = this.form.get('title')?.value;
        this.field.required = this.form.get('required')?.value;
        this.field.params = {
            ...((this.field.params as object) || {}),
            ...this.form.getRawValue(),
        };

        return this.field;
    }

    isValid(): boolean {
        return this.form.valid;
    }
}
