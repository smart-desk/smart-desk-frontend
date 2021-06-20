import { DynamicFieldsBaseUpdateDto } from '../../../../../services/field/models/dynamic-fields-base-update.dto';

export class UpdatePriceDto extends DynamicFieldsBaseUpdateDto {
    value: number;
}
