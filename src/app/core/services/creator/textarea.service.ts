import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatorFieldTextarea, Field } from '../../models/models.dto';

@Injectable()
export class CreatorFieldTextareaService {
    constructor(private http: HttpClient) {}

    getTextareasByFieldID(fieldID: string): Observable<CreatorFieldTextarea[]> {
        return this.http.get<CreatorFieldTextarea[]>(`/fields/creator/textarea?field_id=${fieldID}`);
    }

    getTextarea(id: string): Observable<CreatorFieldTextarea> {
        return this.http.get<CreatorFieldTextarea>(`/fields/creator/textarea/${id}`);
    }

    createTextarea(textArea: Partial<CreatorFieldTextarea>): Observable<CreatorFieldTextarea> {
        return this.http.post<CreatorFieldTextarea>(`/fields/creator/textarea`, textArea);
    }

    updateTextarea(id, textArea: CreatorFieldTextarea): Observable<CreatorFieldTextarea> {
        return this.http.put<CreatorFieldTextarea>(`/fields/creator/textarea/${id}`, textArea);
    }

    deleteTextarea(id): Observable<unknown> {
        return this.http.delete<Field>(`/fields/creator/textarea/${id}`);
    }
}
