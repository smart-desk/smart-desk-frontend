import { DynamicFieldsBaseCreateDto } from '../../../../../models/field/dynamic-fields-base-create.dto';

export class CreateDatepickerDto extends DynamicFieldsBaseCreateDto {
    date1: Date;
    date2: Date;
}
