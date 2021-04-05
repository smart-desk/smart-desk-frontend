import { DynamicFieldsBaseUpdateDto } from '../../../../shared/models/field/dynamic-fields-base-update.dto';

export class UpdatePriceDto extends DynamicFieldsBaseUpdateDto {
    value: number;
}
