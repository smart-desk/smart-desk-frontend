import { DynamicFieldsBaseCreateDto } from '../../../../shared/models/dto/dynamic-fields-base-create.dto';

export class CreateCheckboxDto extends DynamicFieldsBaseCreateDto {
    value: string[];
}
