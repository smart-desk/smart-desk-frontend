import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertsGetDto, AdvertsGetResponseDto, CreateAdvertDto, UpdateAdvertDto } from '../../models/dto/advert.dto';
import { Advert } from '../../models/dto/advert.entity';
import { objectToQueryString } from '../../helpers/object-to-query-string.helper';
import { Filters } from '../../modules/dynamic-fields/models/filter';

@Injectable()
export class AdvertService {
    constructor(private http: HttpClient) {}

    getAdvertsForCategory(category: string, options?: AdvertsGetDto): Observable<AdvertsGetResponseDto> {
        const path = `/adverts/category/${category}${this.buildQueryParams(options)}`;
        return this.http.get<AdvertsGetResponseDto>(path);
    }

    getAdverts(options?: AdvertsGetDto): Observable<AdvertsGetResponseDto> {
        const path = `/adverts${this.buildQueryParams(options)}`;
        return this.http.get<AdvertsGetResponseDto>(path);
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

    deleteAdvert(id: string): Observable<Advert> {
        return this.http.delete<Advert>(`/adverts/${id}`);
    }

    private buildQueryParams(options: AdvertsGetDto): string {
        const optionsList: string[] = [];
        if (!options) {
            return '';
        }

        if (options.limit) {
            optionsList.push(`limit=${options.limit}`);
        }

        if (options.page) {
            optionsList.push(`page=${options.page}`);
        }

        if (options.search) {
            optionsList.push(`search=${options.search}`);
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
