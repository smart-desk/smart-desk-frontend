import { Advert } from './advert.entity';
import { DynamicFieldsBaseCreateDto } from '../field/dynamic-fields-base-create.dto';
import { DynamicFieldsBaseUpdateDto } from '../field/dynamic-fields-base-update.dto';
import { Filters } from '../../modules/dynamic-fields/models/filter';

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

export class GetAdvertsDto {
    page: number = GetAdvertsDto.DEFAULT_PAGE;
    limit: number = GetAdvertsDto.DEFAULT_LIMIT;
    search: string = GetAdvertsDto.DEFAULT_SEARCH;
    filters: Filters = {};
    user: string;

    static DEFAULT_PAGE = 1;
    static DEFAULT_LIMIT = 20;
    static DEFAULT_SEARCH = '';

    get queryParamPage(): number | null {
        return this.page === GetAdvertsDto.DEFAULT_PAGE ? null : this.page;
    }

    get queryParamLimit(): number | null {
        return this.limit === GetAdvertsDto.DEFAULT_LIMIT ? null : this.limit;
    }

    get queryParamSearch(): string | null {
        return this.search === GetAdvertsDto.DEFAULT_SEARCH ? null : this.search;
    }

    get queryParamFilters(): string | null {
        return Object.keys(this.filters).length === 0 ? null : JSON.stringify(this.filters);
    }
}

export class GetAdvertsResponseDto {
    adverts: Advert[];
    totalCount: number;
    page: number;
    limit: number;
}
