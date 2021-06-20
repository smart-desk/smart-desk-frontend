import { DynamicFieldsBaseCreateDto } from '../../../../../services/field/models/dynamic-fields-base-create.dto';

export class CreatePriceDto extends DynamicFieldsBaseCreateDto {
    value: number;
}
