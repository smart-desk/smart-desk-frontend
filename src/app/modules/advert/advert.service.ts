import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAdvertsDto, GetAdvertsResponseDto, CreateAdvertDto, UpdateAdvertDto } from './models/advert.dto';
import { Advert } from './models/advert.entity';
import { objectToQueryString } from '../../helpers/object-to-query-string.helper';
import { Filters } from './models/filter';

@Injectable()
export class AdvertService {
    constructor(private http: HttpClient) {}

    getAdvertsForCategory(category: string, options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const categoryPath = `/products/category/${category}`;
        const path = options ? `${categoryPath}${this.buildQueryParams(options)}` : `${categoryPath}`;
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getMyAdverts(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = options ? `/products/my${this.buildQueryParams(options)}` : '/products/my';
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getAdverts(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = options ? `/products${this.buildQueryParams(options)}` : '/products';
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getRecommendedByAdvertId(id: string): Observable<GetAdvertsResponseDto> {
        const path = `/products/${id}/recommended`;
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getBlocked(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = options ? `/products/blocked${this.buildQueryParams(options)}` : '/products/blocked';
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getPending(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = options ? `/products/pending${this.buildQueryParams(options)}` : '/products/pending';
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getCompleted(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = options ? `/products/completed${this.buildQueryParams(options)}` : '/products/completed';
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getAdvert(id: string): Observable<Advert> {
        return this.http.get<Advert>(`/products/${id}`);
    }

    createAdvert(advert: CreateAdvertDto): Observable<Advert> {
        return this.http.post<Advert>(`/products`, advert);
    }

    updateAdvert(id: string, advert: UpdateAdvertDto): Observable<Advert> {
        return this.http.patch<Advert>(`/products/${id}`, advert);
    }

    countView(id: string): Observable<Advert> {
        return this.http.post<Advert>(`/products/${id}/view`, null);
    }

    blockAdvert(id: string): Observable<Advert> {
        return this.http.patch<Advert>(`/products/${id}/block`, null);
    }

    publishAdvert(id: string): Observable<Advert> {
        return this.http.patch<Advert>(`/products/${id}/publish`, null);
    }

    completeAdvert(id: string): Observable<Advert> {
        return this.http.patch<Advert>(`/products/${id}/complete`, null);
    }

    deleteAdvert(id: string): Observable<Advert> {
        return this.http.delete<Advert>(`/products/${id}`);
    }

    private buildQueryParams(options: GetAdvertsDto): string {
        const optionsList: string[] = [];
        if (!options) {
            return '';
        }

        if (options.limit && options.limit !== GetAdvertsDto.DEFAULT_LIMIT) {
            optionsList.push(`limit=${options.limit}`);
        }

        if (options.page && options.page !== GetAdvertsDto.DEFAULT_PAGE) {
            optionsList.push(`page=${options.page}`);
        }

        if (options.search && options.search !== GetAdvertsDto.DEFAULT_SEARCH) {
            optionsList.push(`search=${options.search}`);
        }

        if (options.user) {
            optionsList.push(`user=${options.user}`);
        }

        if (options.filters) {
            optionsList.push(this.buildFiltersQuery(options.filters));
        }

        if (options.sorting?.field && options.sorting?.direction) {
            optionsList.push(`sorting[${options.sorting.field}]=${options.sorting.direction}`);
        }

        return optionsList.length ? `?${optionsList.join('&')}` : '';
    }

    private buildFiltersQuery(filters: Filters): string {
        const resultObject = { filters };
        return objectToQueryString(resultObject);
    }
}
