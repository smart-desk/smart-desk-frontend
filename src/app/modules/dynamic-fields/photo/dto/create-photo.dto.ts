import { DynamicFieldsBaseCreateDto } from '../../../../shared/models/dto/dynamic-fields-base-create.dto';

export class CreatePhotoDto extends DynamicFieldsBaseCreateDto {
    value: string[];
}
