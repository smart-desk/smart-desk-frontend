import { DynamicFieldsBaseCreateDto } from '../../../../shared/models/dto/dynamic-fields-base-create.dto';

export class CreatePriceDto extends DynamicFieldsBaseCreateDto {
    value: number;
}
