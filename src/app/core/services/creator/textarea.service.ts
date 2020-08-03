import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatorFieldText, Field } from '../../models/models.dto';

@Injectable()
export class CreatorFieldTextareaService {
    constructor(private http: HttpClient) {}

    getTextAreasByFieldID(fieldID: string): Observable<CreatorFieldText[]> {
        return this.http.get<CreatorFieldText[]>(`/fields/creator/text?field_id=${fieldID}`);
    }

    getTextArea(id: string): Observable<CreatorFieldText> {
        return this.http.get<CreatorFieldText>(`/fields/creator/text/${id}`);
    }

    createTextArea(textArea: Partial<CreatorFieldText>): Observable<CreatorFieldText> {
        return this.http.post<CreatorFieldText>(`/fields/creator/text`, textArea);
    }

    updateTextArea(id, textArea: CreatorFieldText): Observable<CreatorFieldText> {
        return this.http.put<CreatorFieldText>(`/fields/creator/text/${id}`, textArea);
    }

    deleteTextArea(id): Observable<unknown> {
        return this.http.delete<Field>(`/fields/creator/text/${id}`);
    }
}
