import { DynamicFieldsBaseCreateDto } from "../../../../shared/models/dto/dynamic-fields-base-create.dto";


export class CreateLocationDto extends DynamicFieldsBaseCreateDto {
    title: string;
    lat: number;
    lng: number;
}
