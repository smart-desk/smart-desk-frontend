import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter } from '../../../models/filter';
import { isNull } from 'lodash';
import { AbstractFieldFilterComponent } from '../../../models/abstract-field-filter.component';
import { DatepickerParamsDto } from '../dto/datepicker-params.dto';
import { DatepickerFilterDto } from '../dto/datepicker-filter.dto';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-datepicker-filter',
    templateUrl: './datepicker-filter.component.html',
    styleUrls: ['./datepicker-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerFilterComponent extends AbstractFieldFilterComponent<DatepickerParamsDto, DatepickerFilterDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            dateRange: [[this.filter?.getFilterParams()?.from || null, this.filter?.getFilterParams()?.to || null]],
        });
    }

    getFilterValue(): Filter<DatepickerFilterDto> | null {
        if (this.form.touched || !this.emptyValues()) {
            const form = this.form.get('dateRange')?.value;
            const from: Date = form[0];
            const to: Date = form[1];
            return new Filter(this.field.id, {
                from: dayjs(from).toISOString(),
                to: dayjs(to).toISOString(),
                range: this.field?.params?.range,
            });
        }
        return null;
    }

    dropFilters(): void {
        this.filter = null;
        this.updateFormValues();
    }

    private updateFormValues(): void {
        this.form.patchValue(
            {
                dateRange: [[this.filter?.getFilterParams()?.from || null, this.filter?.getFilterParams()?.to || null]],
            },
            { onlySelf: true }
        );
    }

    private emptyValues(): boolean {
        return isNull(this.form.get('dateRange')?.value);
    }
}
