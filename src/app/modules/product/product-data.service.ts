import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { ProductService } from './product.service';
import { Sorting } from './models/sorting.interface';
import { GetProductsDto, GetProductsResponseDto } from './models/product.dto';
import { Filter, Filters } from './models/filter';
import { convertFiltersToObject } from '../../utils';

export enum ProductDataEvents {
    DROP_FILTERS,
    APPLY_FILTERS,
    SEARCH,
    CHANGE_PAGE,
    SORT,
    LOAD,
}

@Injectable({
    providedIn: 'root',
})
export class ProductDataService {
    products$ = new Subject<GetProductsResponseDto>();
    events$ = new Subject<ProductDataEvents>();
    private categoryId: string | null;
    private options: GetProductsDto = new GetProductsDto();

    constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

    loadProducts(categoryId: string | null, options?: GetProductsDto): void {
        this.categoryId = categoryId;
        this.options = options ? options : this.options;
        this.requestProducts();
        this.events$.next(ProductDataEvents.LOAD);
    }

    changeSorting(sorting: Sorting | null): void {
        this.options.sorting = sorting;
        this.requestProducts();
        this.updateQueryParams();
        this.events$.next(ProductDataEvents.SORT);
    }

    changePage(page: number): void {
        this.options.page = page;
        this.requestProducts();
        this.updateQueryParams();
        this.events$.next(ProductDataEvents.CHANGE_PAGE);
    }

    search(phrase: string): void {
        this.options.search = phrase;
        this.requestProducts();
        this.updateQueryParams();
        this.events$.next(ProductDataEvents.SEARCH);
    }

    applyFilters(filters: Filter<unknown>[]): void {
        this.options.filters = [...filters];
        this.requestProducts();
        this.updateQueryParams();
        this.updateHiddenFiltersStorage();
        this.events$.next(ProductDataEvents.APPLY_FILTERS);
    }

    dropFilters(): void {
        this.options.filters = [];
        this.requestProducts();
        this.updateQueryParams();
        this.updateHiddenFiltersStorage();
        this.events$.next(ProductDataEvents.DROP_FILTERS);
    }

    getProductOptionsFromQueryAndStorage(queryParams: ParamMap): GetProductsDto {
        const options = this.getProductOptionsFromQuery(queryParams);
        const hiddenOptions = this.getProductOptionsFromStorage();

        options.filters = [...(options?.filters || []), ...(hiddenOptions?.filters || [])];
        return options;
    }

    private getProductOptionsFromQuery(queryParams: ParamMap): GetProductsDto {
        const resultParams = new GetProductsDto();

        if (queryParams.has('page')) {
            try {
                resultParams.page = parseInt(queryParams.get('page') || '', 10);
            } catch (e) {}
        }

        if (queryParams.has('limit')) {
            try {
                resultParams.limit = parseInt(queryParams.get('limit') || '', 10);
            } catch (e) {}
        }

        if (queryParams.has('search')) {
            resultParams.search = queryParams.get('search') || '';
        }

        if (queryParams.has('filters')) {
            try {
                const queryFilters = JSON.parse(queryParams.get('filters') as string) as Filters;
                resultParams.filters = this.getFiltersFromObject(queryFilters);
            } catch (e) {}
        }

        if (queryParams.has('sorting')) {
            try {
                resultParams.sorting = JSON.parse(queryParams.get('sorting') || '');
            } catch (e) {}
        }

        return resultParams;
    }

    private getProductOptionsFromStorage(): GetProductsDto {
        const resultParams = new GetProductsDto();

        const hiddenFilters = this.getHiddenFilters() || {};
        resultParams.filters = this.getFiltersFromObject(hiddenFilters, true);

        return resultParams;
    }

    private updateHiddenFiltersStorage(): void {
        if (this.options?.filters?.length) {
            const filtersObject = convertFiltersToObject(this.options.filters.filter(f => f.isHidden()));
            localStorage.setItem('filters', JSON.stringify(filtersObject));
        } else {
            localStorage.setItem('filters', '');
        }
    }

    private getHiddenFilters(): Filters | null {
        try {
            const filters = localStorage.getItem('filters');
            if (filters) {
                return JSON.parse(filters) as Filters;
            }
            return null;
        } catch (err) {
            return null;
        }
    }

    private requestProducts(): void {
        const req = this.categoryId
            ? this.productService.getProductsForCategory(this.categoryId, this.options)
            : this.productService.getProducts(this.options);

        req.subscribe(res => this.products$.next(res));
    }

    private updateQueryParams(): void {
        const extras: NavigationExtras = {
            queryParams: {
                page: this.options.queryParamPage,
                limit: this.options.queryParamLimit,
                search: this.options.queryParamSearch,
                filters: this.options.queryParamFilters,
                sorting: this.options.queryParamSorting,
            },
        };

        this.router.navigate([], extras);
    }

    private getFiltersFromObject(filtersObject: Filters, hidden = false): Filter<unknown>[] {
        return Object.keys(filtersObject).map(key => new Filter(key, filtersObject[key], hidden));
    }
}
