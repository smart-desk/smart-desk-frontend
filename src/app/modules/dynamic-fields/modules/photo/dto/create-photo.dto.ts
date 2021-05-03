import { DynamicFieldsBaseCreateDto } from '../../../../../../../models/field/dynamic-fields-base-create.dto';

export class CreatePhotoDto extends DynamicFieldsBaseCreateDto {
    value: string[];
}
