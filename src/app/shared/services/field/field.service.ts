import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldEntity } from '../../models/dto/field.entity';
import { FieldCreateDto, FieldUpdateDto } from '../../models/dto/field.dto';

@Injectable()
export class FieldService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array of fields for specified section id
     */
    getFieldsBySectionID(sectionID: string): Observable<FieldEntity[]> {
        return this.http.get<FieldEntity[]>(`/fields?section_id=${sectionID}`);
    }

    /**
     * Return field by id
     */
    getField(id: string): Observable<FieldEntity> {
        return this.http.get<FieldEntity>(`/fields/${id}`);
    }

    /**
     * Create field
     */
    createField(field: FieldCreateDto): Observable<FieldEntity> {
        return this.http.post<FieldEntity>(`/fields`, field);
    }

    /**
     * Update field by id
     */
    updateField(id: string, field: FieldUpdateDto): Observable<FieldEntity> {
        return this.http.put<FieldEntity>(`/fields/${id}`, field);
    }

    /**
     * Delete field by id
     */
    deleteField(id: string): Observable<unknown> {
        return this.http.delete<FieldEntity>(`/fields/${id}`);
    }
}
