import { DynamicFieldsBaseCreateDto } from '../../../../shared/models/field/dynamic-fields-base-create.dto';

export class CreateTextareaDto extends DynamicFieldsBaseCreateDto {
    value: string;
}
