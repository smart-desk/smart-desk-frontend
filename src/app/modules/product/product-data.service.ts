import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { ProductService } from './product.service';
import { Sorting } from './models/sorting.interface';
import { GetProductsDto, GetProductsResponseDto } from './models/product.dto';
import { Filter, Filters } from './models/filter';
import { ProductStatus } from './models/product-status.enum';

export enum ProductDataEvents {
    DROP_FILTERS,
    APPLY_FILTERS,
    SEARCH,
    CHANGE_PAGE,
    CHANGE_STATUS,
    SORT,
    LOAD,
    RELOAD,
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

    changeStatus(status: ProductStatus): void {
        this.options.page = 1;
        this.options.status = status;
        this.requestProducts();
        this.updateQueryParams();
        this.events$.next(ProductDataEvents.CHANGE_STATUS);
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
        this.events$.next(ProductDataEvents.APPLY_FILTERS);
    }

    dropFilters(): void {
        this.options.filters = [];
        this.requestProducts();
        this.updateQueryParams();
        this.events$.next(ProductDataEvents.DROP_FILTERS);
    }

    reloadProducts(): void {
        this.requestProducts();
        this.events$.next(ProductDataEvents.RELOAD);
    }

    getProductOptionsFromQuery(queryParams: ParamMap): GetProductsDto {
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

        if (queryParams.has('status')) {
            try {
                resultParams.status = (queryParams.get('status') as ProductStatus) || ProductStatus.ACTIVE;
            } catch (e) {}
        }

        return resultParams;
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
                status: this.options.queryParamStatus,
            },
        };

        this.router.navigate([], extras);
    }

    private getFiltersFromObject(filtersObject: Filters, hidden = false): Filter<unknown>[] {
        return Object.keys(filtersObject).map(key => new Filter(key, filtersObject[key]));
    }
}
