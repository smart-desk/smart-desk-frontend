import { DynamicFieldsBaseUpdateDto } from '../../../../shared/models/dto/dynamic-fields-base-update.dto';

export class UpdateLocationDto extends DynamicFieldsBaseUpdateDto {
    title: string;
    lat: number;
    lng: number;
}
