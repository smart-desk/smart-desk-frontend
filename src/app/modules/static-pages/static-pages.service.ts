import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageEntity } from './models/page.entity';
import { HttpClient } from '@angular/common/http';
import { PageDto } from './models/page.dto';

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

    update(id: string, body: PageDto): Observable<PageEntity> {
        return this.http.patch<PageEntity>(`/pages/${id}`, body);
    }

    create(body: PageDto): Observable<PageEntity> {
        return this.http.post<PageEntity>('/pages', body);
    }
}
