import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertsGetResponseDto, CreateAdvertDto, UpdateAdvertDto } from '../../models/dto/advert.dto';
import { Advert } from '../../models/dto/advert.entity';

export interface AdvertRequestOptions {
    categoryId?: string;
    page?: number;
    search?: string;
    /* TODO: Нужно дополнить AdvertRequestOptions запроса
        author?: string ; **/
}

@Injectable()
export class AdvertService {
    constructor(private http: HttpClient) {}

    // todo use AdvertsGetDto
    getAdverts(options: AdvertRequestOptions): Observable<AdvertsGetResponseDto> {
        let path = '/adverts';
        const optionsList: string[] = [];

        if (options.categoryId) {
            optionsList.push(`category_id=${options.categoryId}`);
        }

        if (options.page) {
            optionsList.push(`page=${options.page}`);
        }

        if (options.search) {
            optionsList.push(`search=${options.search}`);
        }
        /* TODO: после дополнения требуется доп аброботка кейса
        if (options.author) {
            optionsList.push(`author=${options.author}`);
        }
**/
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
}
