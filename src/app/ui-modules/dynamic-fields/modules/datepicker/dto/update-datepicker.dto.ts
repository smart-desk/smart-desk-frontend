import { DynamicFieldsBaseUpdateDto } from '../../../../../modules/field/models/dynamic-fields-base-update.dto';

export class UpdateDatepickerDto extends DynamicFieldsBaseUpdateDto {
    date1: Date;
    date2: Date;
}
