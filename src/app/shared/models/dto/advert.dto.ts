import { CreateFieldDataBaseDto, UpdateFieldDataBaseDto } from './field-data/field-data-base.dto';
import { Advert } from './advert.entity';

export class CreateAdvertDto {
    category_id: string;
    model_id: string;
    title: string;
    fields: CreateFieldDataBaseDto[];
}

export class UpdateAdvertDto {
    title: string;
    fields: UpdateFieldDataBaseDto[];
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
