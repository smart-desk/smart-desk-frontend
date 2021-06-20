import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { TextareaParamsDto } from '../dto/textarea-params.dto';
import { Field } from '../../../../../services/field/models/field';

@Component({
    selector: 'app-textarea-params',
    templateUrl: './textarea-params.component.html',
    styleUrls: ['./textarea-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaParamsComponent extends AbstractFieldParamsComponent<TextareaParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        const params = this.field.params;

        this.form = this.fb.group({
            title: [this.field.title, false],
            required: [this.field.required || false],
            placeholder: [params?.placeholder || ''],
            richTextEditor: [params?.richTextEditor || false],
        });
    }

    getField(): Field<unknown, TextareaParamsDto> {
        this.field.title = this.form.get('title')?.value;
        this.field.required = this.form.get('required')?.value;
        this.field.params = {
            placeholder: this.form.get('placeholder')?.value,
            richTextEditor: this.form.get('richTextEditor')?.value,
        };
        return this.field;
    }
}
