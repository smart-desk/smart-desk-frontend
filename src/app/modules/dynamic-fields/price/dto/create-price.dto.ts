import { DynamicFieldsBaseCreateDto } from '../../../../shared/models/field/dynamic-fields-base-create.dto';

export class CreatePriceDto extends DynamicFieldsBaseCreateDto {
    value: number;
}
