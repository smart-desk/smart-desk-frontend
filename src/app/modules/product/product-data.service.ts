import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { ProductService } from './product.service';
import { Sorting } from './models/sorting.interface';
import { GetProductsDto, GetProductsResponseDto } from './models/product.dto';
import { Filters } from './models/filter';

@Injectable({
    providedIn: 'root',
})
export class ProductDataService {
    products$ = new Subject<GetProductsResponseDto>();
    private categoryId: string | null;
    private options: GetProductsDto = new GetProductsDto();

    constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

    loadProducts(categoryId: string | null, options?: GetProductsDto): void {
        this.categoryId = categoryId;
        this.options = options ? options : this.options;
        this.requestProducts();
        this.updateQueryParams();
    }

    changeSorting(sorting: Sorting | null): void {
        this.options.sorting = sorting;
        this.requestProducts();
        this.updateQueryParams();
    }

    changePage(page: number): void {
        this.options.page = page;
        this.requestProducts();
        this.updateQueryParams();
    }

    search(phrase: string): void {
        this.options.search = phrase;
        this.requestProducts();
        this.updateQueryParams();
    }

    applyFilters(filters: Filters): void {
        this.options.filters = filters;
        this.requestProducts();
        this.updateQueryParams();
    }

    parseQueryParams(queryParams: ParamMap): GetProductsDto {
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
                resultParams.filters = JSON.parse(queryParams.get('filters') || '');
            } catch (e) {}
        }
        if (queryParams.has('sorting')) {
            try {
                resultParams.sorting = JSON.parse(queryParams.get('sorting') || '');
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
            },
        };

        this.router.navigate([], extras);
    }
}
