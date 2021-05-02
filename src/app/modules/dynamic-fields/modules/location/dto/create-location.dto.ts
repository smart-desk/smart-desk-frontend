import { DynamicFieldsBaseCreateDto } from '../../../../../models/field/dynamic-fields-base-create.dto';

export class CreateLocationDto extends DynamicFieldsBaseCreateDto {
    title: string;
    lat: number;
    lng: number;
}
