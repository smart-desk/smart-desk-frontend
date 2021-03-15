import { DynamicFieldsBaseUpdateDto } from '../../../../shared/models/dto/dynamic-fields-base-update.dto';

export class UpdateCheckboxDto extends DynamicFieldsBaseUpdateDto {
    value: string[];
}
