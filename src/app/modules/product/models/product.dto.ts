import { Product } from './product.entity';
import { DynamicFieldsBaseCreateDto } from '../../field/models/dynamic-fields-base-create.dto';
import { DynamicFieldsBaseUpdateDto } from '../../field/models/dynamic-fields-base-update.dto';
import { Filters } from './filter';
import { Sorting } from './sorting.interface';

export class CreateProductDto {
    category_id: string;
    model_id: string;
    title: string;
    preferContact: string;
    fields: DynamicFieldsBaseCreateDto[];
}

export class UpdateProductDto {
    title: string;
    fields: DynamicFieldsBaseUpdateDto[];
    preferContact: string;
}

export class GetProductsDto {
    page?: number = GetProductsDto.DEFAULT_PAGE;
    limit?: number = GetProductsDto.DEFAULT_LIMIT;
    search?: string = GetProductsDto.DEFAULT_SEARCH;
    filters?: Filters = {};
    sorting?: Sorting | null;
    user?: string;

    static DEFAULT_PAGE = 1;
    static DEFAULT_LIMIT = 20;
    static DEFAULT_SEARCH = '';

    get queryParamPage(): number | undefined {
        return this.page === GetProductsDto.DEFAULT_PAGE ? undefined : this.page;
    }

    get queryParamLimit(): number | undefined {
        return this.limit === GetProductsDto.DEFAULT_LIMIT ? undefined : this.limit;
    }

    get queryParamSearch(): string | undefined {
        return this.search === GetProductsDto.DEFAULT_SEARCH ? undefined : this.search;
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

export class GetProductsResponseDto {
    products: Product[];
    totalCount: number;
    page: number;
    limit: number;
}
