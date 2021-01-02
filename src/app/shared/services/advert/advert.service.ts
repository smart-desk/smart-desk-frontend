import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertsGetDto, AdvertsGetResponseDto, CreateAdvertDto, Filters, UpdateAdvertDto } from '../../models/dto/advert.dto';
import { Advert } from '../../models/dto/advert.entity';
import { objectToQueryString } from '../../helpers/object-to-query-string.helper';

@Injectable()
export class AdvertService {
    constructor(private http: HttpClient) {}

    getAdverts(category: string, options: AdvertsGetDto): Observable<AdvertsGetResponseDto> {
        let path = `/adverts/category/${category}`;
        const optionsList: string[] = [];

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

        path += optionsList.length ? `?${optionsList.join('&')}` : '';
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

    deleteAdvert(id: string): Observable<unknown> {
        return this.http.delete<Advert>(`/adverts/${id}`);
    }

    private buildFiltersQuery(filters: object): string {
        // todo
        const resultObject = { filters };
        return objectToQueryString(resultObject);
    }
}
