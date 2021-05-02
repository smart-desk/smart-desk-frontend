import { DynamicFieldsBaseUpdateDto } from '../../../../../models/field/dynamic-fields-base-update.dto';

export class UpdatePhotoDto extends DynamicFieldsBaseUpdateDto {
    value: string[];
}
