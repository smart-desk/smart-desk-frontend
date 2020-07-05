import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field, Model, ModelExtended } from '../../models/models.dto';
import { environment } from '../../../../environments/environment';

// todo move adding environment api variable to interceptor

@Injectable()
export class FieldService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array of fields for specified section id
     */
    public getFieldsBySectionID(sectionID: string): Observable<Field[]> {
        return this.http.get<Field[]>(`${environment.apiURL}fields?section_id=${sectionID}`);
    }

    /**
     * Return field by id
     */
    public getField(id: string): Observable<Field> {
        return this.http.get<Field>(`${environment.apiURL}fields/${id}`);
    }

    /**
     * Create field
     */
    public createField(field: Field): Observable<Field> {
        return this.http.post<Field>(`${environment.apiURL}fields`, field);
    }

    /**
     * Update field by id
     */
    public updateField(id, field: Field): Observable<Field> {
        return this.http.put<Field>(`${environment.apiURL}fields/${id}`, field);
    }

    /**
     * Delete field by id
     */
    public deleteField(id): Observable<unknown> {
        return this.http.delete<Field>(`${environment.apiURL}fields/${id}`);
    }
}
