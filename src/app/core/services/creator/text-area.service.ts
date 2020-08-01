import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatorFieldTextArea, Field } from '../../models/models.dto';

// todo move adding environment api variable to interceptor

@Injectable()
export class CreatorFieldTextAreaService {
    constructor(private http: HttpClient) {}

    getTextAreasByFieldID(fieldID: string): Observable<CreatorFieldTextArea[]> {
        return this.http.get<CreatorFieldTextArea[]>(`fields/creator/text?field_id=${fieldID}`);
    }

    getTextArea(id: string): Observable<CreatorFieldTextArea> {
        return this.http.get<CreatorFieldTextArea>(`fields/creator/text/${id}`);
    }

    createTextArea(textArea: Partial<CreatorFieldTextArea>): Observable<CreatorFieldTextArea> {
        return this.http.post<CreatorFieldTextArea>(`fields/creator/text`, textArea);
    }

    updateTextArea(id, textArea: CreatorFieldTextArea): Observable<CreatorFieldTextArea> {
        return this.http.put<CreatorFieldTextArea>(`fields/creator/text/${id}`, textArea);
    }

    deleteTextArea(id): Observable<unknown> {
        return this.http.delete<Field>(`fields/creator/text/${id}`);
    }
}
