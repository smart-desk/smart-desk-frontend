import { DynamicFieldsBaseUpdateDto } from '../../../../../services/field/models/dynamic-fields-base-update.dto';

export class UpdateLocationDto extends DynamicFieldsBaseUpdateDto {
    title: string;
    lat: number;
    lng: number;
}
