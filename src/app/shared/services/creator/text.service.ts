import { Injectable } from '@angular/core';
import { CreatorFieldText, Field } from '../../models/models.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CreatorFieldTextService {
    constructor(private http: HttpClient) {}

    getTextByFieldID(fieldID: string): Observable<CreatorFieldText[]> {
        return this.http.get<CreatorFieldText[]>(`/fields/creator/text?field_id=${fieldID}`);
    }

    getText(id: string): Observable<CreatorFieldText> {
        return this.http.get<CreatorFieldText>(`/fields/creator/text/${id}`);
    }

    createText(field: Partial<CreatorFieldText>): Observable<CreatorFieldText> {
        return this.http.post<CreatorFieldText>(`/fields/creator/text`, field);
    }

    updateText(id, field: Partial<CreatorFieldText>): Observable<CreatorFieldText> {
        return this.http.put<CreatorFieldText>(`/fields/creator/text/${id}`, field);
    }

    deleteText(id): Observable<unknown> {
        return this.http.delete<Field>(`/fields/creator/text/${id}`);
    }
}
