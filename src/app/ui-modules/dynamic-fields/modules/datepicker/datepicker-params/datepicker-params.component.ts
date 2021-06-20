import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { FieldService } from '../../../../../modules';
import { DatepickerParamsDto } from '../dto/datepicker-params.dto';
import { Field } from '../../../../../modules/field/models/field';

@Component({
    selector: 'app-date-range-params',
    templateUrl: './datepicker-params.component.html',
    styleUrls: ['./datepicker-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerParamsComponent extends AbstractFieldParamsComponent<DatepickerParamsDto> implements OnInit {
    formField: FormGroup;

    constructor(private fieldService: FieldService, private cd: ChangeDetectorRef, private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.formField = this.fb.group({
            title: [this.field.title || ''],
            filterable: [this.field.filterable || false],
            required: [this.field.required || false],
            range: [this.field?.params?.range || false],
        });
    }

    getField(): Field<unknown, DatepickerParamsDto> {
        this.field.title = this.formField.get('title')?.value;
        this.field.filterable = this.formField.get('filterable')?.value;
        this.field.required = this.formField.get('required')?.value;
        this.field.params = {
            range: this.formField.get('range')?.value,
        };

        return this.field;
    }
}
