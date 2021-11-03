import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractFieldViewComponent } from '../../../models/abstract-field-view.component';
import { DatepickerEntity } from '../entities/datepicker.entity';
import { DatepickerParamsDto } from '../dto/datepicker-params.dto';

@Component({
    selector: 'app-datepicker-view',
    templateUrl: './datepicker-view.component.html',
    styleUrls: ['./datepicker-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerViewComponent extends AbstractFieldViewComponent<DatepickerEntity, DatepickerParamsDto> {
    constructor() {
        super();
    }

    getDateValue(): string {
        let result = '';
        const datePipe = new DatePipe('ru');
        if (this.field?.data?.date1) {
            result += datePipe.transform(this.field.data.date1);
        }
        if (this.field?.data?.date2) {
            result += ' - ' + datePipe.transform(this.field.data.date2);
        }

        return result;
    }
}
