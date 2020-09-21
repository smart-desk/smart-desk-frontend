import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advert, AdvertListResponse, AdvertRequest } from '../../models/models.dto';

export interface AdvertRequestOptions {
    categoryId?: string;
    page?: number;
    search?: string;
}

@Injectable()
export class AdvertService {
    constructor(private http: HttpClient) {}

    getAdverts(options: AdvertRequestOptions): Observable<AdvertListResponse> {
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

        path += optionsList.length ? `?${optionsList.join('&')}` : '';
        return this.http.get<AdvertListResponse>(path);
    }

    getAdvert(id: string): Observable<Advert> {
        return this.http.get<Advert>(`/adverts/${id}`);
    }

    createAdvert(advert: Partial<AdvertRequest>): Observable<Advert> {
        return this.http.post<Advert>(`/adverts`, advert);
    }

    updateAdvert(id, advert: Partial<AdvertRequest>): Observable<Advert> {
        return this.http.put<Advert>(`/adverts/${id}`, advert);
    }

    deleteAdvert(id): Observable<unknown> {
        return this.http.delete<Advert>(`/adverts/${id}`);
    }
}
