import { Advert } from './advert.entity';
import { DynamicFieldsBaseCreateDto } from '../field/dynamic-fields-base-create.dto';
import { DynamicFieldsBaseUpdateDto } from '../field/dynamic-fields-base-update.dto';
import { Filters } from '../../modules/dynamic-fields/models/filter';
import { Sorting } from '../../modules/main/interfaces/sorting.interface';

export class CreateAdvertDto {
    category_id: string;
    model_id: string;
    title: string;
    preferContact: string;
    fields: DynamicFieldsBaseCreateDto[];
}

export class UpdateAdvertDto {
    title: string;
    fields: DynamicFieldsBaseUpdateDto[];
    preferContact: string;
}

export class GetAdvertsDto {
    page?: number = GetAdvertsDto.DEFAULT_PAGE;
    limit?: number = GetAdvertsDto.DEFAULT_LIMIT;
    search?: string = GetAdvertsDto.DEFAULT_SEARCH;
    filters?: Filters = {};
    sorting?: Sorting | null;
    user?: string;

    static DEFAULT_PAGE = 1;
    static DEFAULT_LIMIT = 20;
    static DEFAULT_SEARCH = '';

    get queryParamPage(): number | undefined {
        return this.page === GetAdvertsDto.DEFAULT_PAGE ? undefined : this.page;
    }

    get queryParamLimit(): number | undefined {
        return this.limit === GetAdvertsDto.DEFAULT_LIMIT ? undefined : this.limit;
    }

    get queryParamSearch(): string | undefined {
        return this.search === GetAdvertsDto.DEFAULT_SEARCH ? undefined : this.search;
    }

    get queryParamFilters(): string | undefined {
        if (!this.filters) {
            return;
        }
        return Object.keys(this.filters).length === 0 ? undefined : JSON.stringify(this.filters);
    }

    get queryParamSorting(): string | undefined {
        if (!this.sorting) {
            return;
        }
        return Object.keys(this.sorting).length === 0 ? undefined : JSON.stringify(this.sorting);
    }
}

export class GetAdvertsResponseDto {
    adverts: Advert[];
    totalCount: number;
    page: number;
    limit: number;
}
