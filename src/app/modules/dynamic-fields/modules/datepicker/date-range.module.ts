import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DatepickerParamsComponent } from './datepicker-params/datepicker-params.component';
import { DateRangeService } from './date-range.service';

@NgModule({
    declarations: [DatepickerParamsComponent],
    imports: [CommonModule, NzDatePickerModule],
    providers: [DateRangeService],
})
export class DateRangeModule {}
