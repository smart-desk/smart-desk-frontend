import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { DatepickerParamsDto } from '../dto/datepicker-params.dto';
import { DatepickerEntity } from '../entities/datepicker.entity';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateDatepickerDto } from '../dto/create-datepicker.dto';

@Component({
    selector: 'app-datepicker-form',
    templateUrl: './datepicker-form.component.html',
    styleUrls: ['./datepicker-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerFormComponent extends AbstractFieldFormComponent<DatepickerEntity, DatepickerParamsDto> implements OnInit {
    datepickerForm: FormGroup;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.datepickerForm = new FormGroup({
            date1: new FormControl(this.field?.data?.date1),
            daterange: new FormControl([this.field?.data?.date1, this.field?.data?.date2]),
        });
    }

    getFieldData(): any {
        if (this.field.data) {
            if (this.field.params.range) {
                this.field.data.date1 = this.datepickerForm.get('daterange')?.value[0];
                this.field.data.date2 = this.datepickerForm.get('daterange')?.value[1];
            } else {
                this.field.data.date1 = this.datepickerForm.get('date1')?.value;
            }
            return this.field.data;
        }

        const productField = new CreateDatepickerDto();
        if (this.field.params.range) {
            productField.date1 = this.datepickerForm.get('daterange')?.value[0];
            productField.date2 = this.datepickerForm.get('daterange')?.value[1];
        } else {
            productField.date1 = this.datepickerForm.get('date1')?.value;
        }
        productField.fieldId = this.field.id;

        return productField;
    }

    isFieldDataValid(): boolean {
        return true;
    }
}
