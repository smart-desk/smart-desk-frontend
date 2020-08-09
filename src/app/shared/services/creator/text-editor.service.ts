import { Injectable } from '@angular/core';
import { Field } from '../../models/models.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CreatorFieldTextEditorService {
    constructor(private http: HttpClient) {}

    getRadioByFieldID(fieldID: string): Observable<any[]> {
        return this.http.get<any[]>(`/fields/creator/textEditor?field_id=${fieldID}`);
    }

    getRadio(id: string): Observable<any> {
        return this.http.get<any>(`/fields/creator/textEditor/${id}`);
    }

    createRadio(field: Partial<any>): Observable<any> {
        return this.http.post<any>(`/fields/creator/textEditor`, field);
    }

    updateRadio(id, field: any): Observable<any> {
        return this.http.put<any>(`/fields/creator/textEditor/${id}`, field);
    }

    deleteRadio(id): Observable<unknown> {
        return this.http.delete<Field>(`/fields/creator/textEditor/${id}`);
    }
}
