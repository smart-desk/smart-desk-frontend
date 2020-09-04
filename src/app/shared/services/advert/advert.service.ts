import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advert } from '../../models/models.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class AdvertService {
    constructor(private http: HttpClient) {}

    getAdverts(): Observable<Advert[]> {
        return this.http.get<Advert[]>(`/adverts`);
    }

    getAdvert(id: string): Observable<Advert> {
        // todo change it and fix it!!!
        return this.getAdverts().pipe(
            map(res => {
                return res.find(advert => advert.id === id);
            })
        );
        // return this.http.get<Advert>(`/adverts/${id}`);
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
