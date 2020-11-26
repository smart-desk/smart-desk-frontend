import { Advert } from './advert.entity';
import { DynamicFieldsBaseCreateDto } from './dynamic-fields-base-create.dto';
import { DynamicFieldsBaseUpdateDto } from './dynamic-fields-base-update.dto';

export class CreateAdvertDto {
    category_id: string;
    model_id: string;
    title: string;
    fields: DynamicFieldsBaseCreateDto[];
}

export class UpdateAdvertDto {
    title: string;
    fields: DynamicFieldsBaseUpdateDto[];
}

export class AdvertsGetDto {
    page?: number = 1;
    limit?: number = 20;
    category_id?: string;
    search?: string = '';
}

export class AdvertsGetResponseDto {
    adverts: Advert[];
    totalCount: number;
    page: number;
    limit: number;
}
