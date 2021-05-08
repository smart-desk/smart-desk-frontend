import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldService } from '../../../../../services';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { InputTextParamsDto } from '../dto/input-text-params.dto';
import { Field } from '../../../../../models/field/field';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-params.component.html',
    styleUrls: ['./input-text-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextParamsComponent extends AbstractFieldParamsComponent<InputTextParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fieldService: FieldService, private fb: FormBuilder, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: [this.field?.title || '', [Validators.required]],
            required: [this.field?.required || false],
            placeholder: [this.field?.params?.placeholder || ''],
        });
    }

    getField(): Field<unknown, InputTextParamsDto> {
        this.field.title = this.form.get('title').value;
        this.field.required = this.form.get('required').value;
        this.field.params = {
            placeholder: this.form.get('placeholder').value,
        };

        return this.field;
    }

    delete(): void {
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }
}
