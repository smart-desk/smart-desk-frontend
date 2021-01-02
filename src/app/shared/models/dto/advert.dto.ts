import { Advert } from './advert.entity';
import { DynamicFieldsBaseCreateDto } from './dynamic-fields-base-create.dto';
import { DynamicFieldsBaseUpdateDto } from './dynamic-fields-base-update.dto';

export interface Filters {
    [key: string]: object | [];
}

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
    page?: number = AdvertsGetDto.DEFAULT_PAGE;
    limit?: number = AdvertsGetDto.DEFAULT_LIMIT;
    search?: string = AdvertsGetDto.DEFAULT_SEARCH;
    filters?: Filters = {};

    static DEFAULT_PAGE = 1;
    static DEFAULT_LIMIT = 20;
    static DEFAULT_SEARCH = '';

    get queryParamPage(): number {
        return this.page === AdvertsGetDto.DEFAULT_PAGE ? null : this.page;
    }

    get queryParamLimit(): number {
        return this.limit === AdvertsGetDto.DEFAULT_LIMIT ? null : this.limit;
    }

    get queryParamSearch(): string {
        return this.search === AdvertsGetDto.DEFAULT_SEARCH ? null : this.search;
    }

    get queryParamFilters(): string {
        return Object.keys(this.filters).length === 0 ? null : JSON.stringify(this.filters);
    }
}

export class AdvertsGetResponseDto {
    adverts: Advert[];
    totalCount: number;
    page: number;
    limit: number;
}
