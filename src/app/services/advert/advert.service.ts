import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAdvertsDto, GetAdvertsResponseDto, CreateAdvertDto, UpdateAdvertDto } from '../../models/advert/advert.dto';
import { Advert } from '../../models/advert/advert.entity';
import { objectToQueryString } from '../../helpers/object-to-query-string.helper';
import { Filters } from '../../modules/dynamic-fields/models/filter';

@Injectable()
export class AdvertService {
    constructor(private http: HttpClient) {}

    getAdvertsForCategory(category: string, options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = `/adverts/category/${category}${this.buildQueryParams(options)}`;
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getMyAdverts(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = `/adverts/my${this.buildQueryParams(options)}`;
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getAdverts(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = `/adverts${this.buildQueryParams(options)}`;
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getRecommendedByAdvertId(id: string): Observable<GetAdvertsResponseDto> {
        const path = `/adverts/${id}/recommended`;
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getBlocked(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = `/adverts/blocked${this.buildQueryParams(options)}`;
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getPending(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = `/adverts/pending${this.buildQueryParams(options)}`;
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getCompleted(options?: GetAdvertsDto): Observable<GetAdvertsResponseDto> {
        const path = `/adverts/completed${this.buildQueryParams(options)}`;
        return this.http.get<GetAdvertsResponseDto>(path);
    }

    getAdvert(id: string): Observable<Advert> {
        return this.http.get<Advert>(`/adverts/${id}`);
    }

    createAdvert(advert: CreateAdvertDto): Observable<Advert> {
        return this.http.post<Advert>(`/adverts`, advert);
    }

    updateAdvert(id: string, advert: UpdateAdvertDto): Observable<Advert> {
        return this.http.patch<Advert>(`/adverts/${id}`, advert);
    }

    countView(id: string): Observable<Advert> {
        return this.http.post<Advert>(`/adverts/${id}/view`, null);
    }

    blockAdvert(id: string): Observable<Advert> {
        return this.http.patch<Advert>(`/adverts/${id}/block`, null);
    }

    publishAdvert(id: string): Observable<Advert> {
        return this.http.patch<Advert>(`/adverts/${id}/publish`, null);
    }

    completeAdvert(id: string): Observable<Advert> {
        return this.http.patch<Advert>(`/adverts/${id}/complete`, null);
    }

    deleteAdvert(id: string): Observable<Advert> {
        return this.http.delete<Advert>(`/adverts/${id}`);
    }

    private buildQueryParams(options: GetAdvertsDto | undefined): string {
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

        return optionsList.length ? `?${optionsList.join('&')}` : '';
    }

    private buildFiltersQuery(filters: Filters): string {
        const resultObject = { filters };
        return objectToQueryString(resultObject);
    }
}
