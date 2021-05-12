import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../models/abstract-field-view.component';
import { DatepickerEntity } from '../entities/datepicker.entity';
import { DatepickerParamsDto } from '../dto/datepicker-params.dto';

@Component({
    selector: 'app-datepicker-view',
    templateUrl: './datepicker-view.component.html',
    styleUrls: ['./datepicker-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerViewComponent extends AbstractFieldViewComponent<DatepickerEntity, DatepickerParamsDto> {}
