import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Field } from '../../models/models.dto';

// todo move adding environment api variable to interceptor

@Injectable()
export class FieldService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array of fields for specified section id
     */
    getFieldsBySectionID(sectionID: string): Observable<Field[]> {
        return this.http.get<Field[]>(`fields?section_id=${sectionID}`);
    }

    /**
     * Return field by id
     */
    getField(id: string): Observable<Field> {
        return this.http.get<Field>(`fields/${id}`);
    }

    /**
     * Create field
     */
    createField(field: Partial<Field>): Observable<Field> {
        return this.http.post<Field>(`fields`, field);
    }

    /**
     * Update field by id
     */
    updateField(id, field: Field): Observable<Field> {
        return this.http.put<Field>(`fields/${id}`, field);
    }

    /**
     * Delete field by id
     */
    deleteField(id): Observable<unknown> {
        return this.http.delete<Field>(`fields/${id}`);
    }
}
