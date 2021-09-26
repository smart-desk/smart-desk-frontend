import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { TextParamsDto } from '../dto/text-params.dto';
import { Field } from '../../../../../modules/field/models/field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-params.component.html',
    styleUrls: ['./text-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextParamsComponent extends AbstractFieldParamsComponent<TextParamsDto> implements OnInit {
    content = '';
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            content: [this.field?.params?.value || '', [Validators.required, Validators.maxLength(10000)]],
        });
    }

    getField(): Field<unknown, TextParamsDto> {
        this.field.params = {
            value: this.content,
        };
        return this.field;
    }

    isValid(): boolean {
        return this.form.valid;
    }
}
