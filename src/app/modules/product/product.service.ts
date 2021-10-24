import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProductsDto, GetProductsResponseDto, CreateProductDto, UpdateProductDto } from './models/product.dto';
import { Product } from './models/product.entity';
import { objectToQueryString } from '../../helpers/object-to-query-string.helper';
import { Filters } from './models/filter';
import { StripeSession } from '../stripe/models/stripe-session.interface';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    getProductsForCategory(category: string, options?: GetProductsDto): Observable<GetProductsResponseDto> {
        const categoryPath = `/products/category/${category}`;
        const path = options ? `${categoryPath}${this.buildQueryParams(options)}` : `${categoryPath}`;
        return this.http.get<GetProductsResponseDto>(path);
    }

    getProducts(options?: GetProductsDto): Observable<GetProductsResponseDto> {
        const path = options ? `/products${this.buildQueryParams(options)}` : '/products';
        return this.http.get<GetProductsResponseDto>(path);
    }

    getRecommendedByProductId(id: string): Observable<GetProductsResponseDto> {
        const path = `/products/${id}/recommended`;
        return this.http.get<GetProductsResponseDto>(path);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`/products/${id}`);
    }

    createProduct(product: CreateProductDto): Observable<Product> {
        return this.http.post<Product>(`/products`, product);
    }

    updateProduct(id: string, product: UpdateProductDto): Observable<Product> {
        return this.http.patch<Product>(`/products/${id}`, product);
    }

    countView(id: string): Observable<Product> {
        return this.http.post<Product>(`/products/${id}/view`, null);
    }

    blockProduct(id: string): Observable<Product> {
        return this.http.patch<Product>(`/products/${id}/block`, null);
    }

    publishProduct(id: string): Observable<Product> {
        return this.http.patch<Product>(`/products/${id}/publish`, null);
    }

    completeProduct(id: string): Observable<Product> {
        return this.http.patch<Product>(`/products/${id}/complete`, null);
    }

    deleteProduct(id: string): Observable<Product> {
        return this.http.delete<Product>(`/products/${id}`);
    }

    liftProduct(id: string): Observable<StripeSession> {
        return this.http.post<StripeSession>(`/products/${id}/lift`, null);
    }

    private buildQueryParams(options: GetProductsDto): string {
        const optionsList: string[] = [];
        if (!options) {
            return '';
        }

        if (options.limit && options.limit !== GetProductsDto.DEFAULT_LIMIT) {
            optionsList.push(`limit=${options.limit}`);
        }

        if (options.page && options.page !== GetProductsDto.DEFAULT_PAGE) {
            optionsList.push(`page=${options.page}`);
        }

        if (options.search && options.search !== GetProductsDto.DEFAULT_SEARCH) {
            optionsList.push(`search=${options.search}`);
        }

        if (options.user) {
            optionsList.push(`user=${options.user}`);
        }

        if (options.filters && Object.keys(options.filters).length) {
            optionsList.push(this.buildFiltersQuery(options.filters));
        }

        if (options.sorting?.field && options.sorting?.direction) {
            optionsList.push(`sorting[${options.sorting.field}]=${options.sorting.direction}`);
        }

        if (options.status) {
            optionsList.push(`status=${options.status}`);
        }

        return optionsList.length ? `?${optionsList.join('&')}` : '';
    }

    private buildFiltersQuery(filters: Filters): string {
        const resultObject = { filters };
        return objectToQueryString(resultObject);
    }
}
