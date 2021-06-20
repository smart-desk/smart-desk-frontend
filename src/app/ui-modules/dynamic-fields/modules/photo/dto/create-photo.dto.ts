import { DynamicFieldsBaseCreateDto } from '../../../../../modules/field/models/dynamic-fields-base-create.dto';

export class CreatePhotoDto extends DynamicFieldsBaseCreateDto {
    value: string[];
}
