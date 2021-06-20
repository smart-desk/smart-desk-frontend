import { DynamicFieldsBaseCreateDto } from '../../../../../modules/field/models/dynamic-fields-base-create.dto';

export class CreateLocationDto extends DynamicFieldsBaseCreateDto {
    title: string;
    lat: number;
    lng: number;
}
