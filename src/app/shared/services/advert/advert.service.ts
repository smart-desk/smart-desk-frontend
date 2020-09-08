import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advert } from '../../models/models.dto';

@Injectable()
export class AdvertService {
    constructor(private http: HttpClient) {}

    getAdverts(categoryId: string): Observable<Advert[]> {
        if (categoryId) {
            return this.http.get<Advert[]>(`/adverts?category_id=${categoryId}`);
        }
        return this.http.get<Advert[]>(`/adverts`);
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
