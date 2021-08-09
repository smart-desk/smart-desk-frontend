import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageEntity } from './models/page.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class StaticPagesService {
    constructor(private http: HttpClient) {}

    getPages(): Observable<PageEntity[]> {
        return this.http.get<PageEntity[]>('/pages');
    }

    getPage(id: string): Observable<PageEntity> {
        return this.http.get<PageEntity>(`/pages/${id}`);
    }
}
