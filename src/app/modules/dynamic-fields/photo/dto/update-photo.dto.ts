import { DynamicFieldsBaseUpdateDto } from '../../../../shared/models/dto/dynamic-fields-base-update.dto';

export class UpdatePhotoDto extends DynamicFieldsBaseUpdateDto {
    value: string[];
}
