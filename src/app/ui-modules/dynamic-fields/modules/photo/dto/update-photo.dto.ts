import { DynamicFieldsBaseUpdateDto } from '../../../../../services/field/models/dynamic-fields-base-update.dto';

export class UpdatePhotoDto extends DynamicFieldsBaseUpdateDto {
    value: string[];
}
