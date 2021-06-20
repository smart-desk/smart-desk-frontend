import { DynamicFieldsBaseCreateDto } from '../../../../../services/field/models/dynamic-fields-base-create.dto';

export class CreateDatepickerDto extends DynamicFieldsBaseCreateDto {
    date1: Date;
    date2: Date;
}
