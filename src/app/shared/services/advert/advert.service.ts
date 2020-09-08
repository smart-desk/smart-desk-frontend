import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advert } from '../../models/models.dto';

@Injectable()
export class AdvertService {
    constructor(private http: HttpClient) {}

    getAdverts(categoryId: string): Observable<Advert[]> {
        let path = '/adverts';
        const options: string[] = [];

        if (categoryId) {
            options.push(`category_id=${categoryId}`);
        }

        path += options.length ? `?${options.join('&')}` : '';
        return this.http.get<Advert[]>(path);
    }

    getAdvert(id: string): Observable<Advert> {
        return this.http.get<Advert>(`/adverts/${id}`);
    }

    createAdvert(advert: Partial<Advert>): Observable<Advert> {
        return this.http.post<Advert>(`/adverts`, advert);
    }

    updateAdvert(id, advert: Partial<Advert>): Observable<Advert> {
        return this.http.put<Advert>(`/adverts/${id}`, advert);
    }

    deleteAdvert(id): Observable<unknown> {
        return this.http.delete<Advert>(`/adverts/${id}`);
    }
}
