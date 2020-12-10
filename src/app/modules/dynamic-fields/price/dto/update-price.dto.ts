import { DynamicFieldsBaseUpdateDto } from '../../../../shared/models/dto/dynamic-fields-base-update.dto';

export class UpdatePriceDto extends DynamicFieldsBaseUpdateDto {
    value: number;
}
