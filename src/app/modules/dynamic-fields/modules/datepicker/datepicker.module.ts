import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { DatepickerFormComponent } from './datepicker-form/datepicker-form.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DatepickerParamsComponent } from './datepicker-params/datepicker-params.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DatepickerService } from './datepicker.service';

@NgModule({
    declarations: [DatepickerParamsComponent, DatepickerFormComponent],
    imports: [
        CommonModule,
        NzDatePickerModule,
        FormsModule,
        NzLayoutModule,
        NzFormModule,
        NzInputModule,
        NzCheckboxModule,
        NzButtonModule,
        ReactiveFormsModule,
    ],
    providers: [DatepickerService],
})
export class DatepickerModule {}
