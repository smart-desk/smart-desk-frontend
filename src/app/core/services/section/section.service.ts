import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../../models/models.dto';
import { environment } from '../../../../environments/environment';

// todo move adding environment api variable to interceptor

@Injectable()
export class SectionService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array of sections for specified model
     */
    public getSectionsByModelID(modelID: string): Observable<Section[]> {
        return this.http.get<Section[]>(`${environment.apiURL}sections?model_id=${modelID}`);
    }

    /**
     * Return section by id
     */
    public getSection(id: string): Observable<Section> {
        return this.http.get<Section>(`${environment.apiURL}sections/${id}`);
    }

    /**
     * Create section
     */
    public createSection(section: Partial<Section>): Observable<Section> {
        return this.http.post<Section>(`${environment.apiURL}sections`, section);
    }

    /**
     * Update section by id
     */
    public updateSection(id, section: Partial<Section>): Observable<Section> {
        return this.http.put<Section>(`${environment.apiURL}sections/${id}`, section);
    }

    /**
     * Delete section by id
     */
    public deleteSection(id): Observable<unknown> {
        return this.http.delete<Section>(`${environment.apiURL}sections/${id}`);
    }
}
