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
import { DatepickerViewComponent } from './datepicker-view/datepicker-view.component';
import { DatepickerFilterComponent } from './datepicker-filter/datepicker-filter.component';
import { SharedModule } from '../../../../shared.module';

@NgModule({
    declarations: [DatepickerParamsComponent, DatepickerFormComponent, DatepickerViewComponent, DatepickerFilterComponent],
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
        SharedModule,
    ],
    providers: [DatepickerService],
})
export class DatepickerModule {}
