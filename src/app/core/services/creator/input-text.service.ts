import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatorFieldInputText, Field } from '../../models/models.dto';

// todo move adding environment api variable to interceptor

@Injectable()
export class CreatorFieldInputTextService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array with one element of input text for specified field id
     */
    getInputTextsByFieldID(fieldID: string): Observable<CreatorFieldInputText[]> {
        return this.http.get<CreatorFieldInputText[]>(`fields/creator/input-text?field_id=${fieldID}`);
    }

    /**
     * Returns input text by id
     */
    getInputText(id: string): Observable<CreatorFieldInputText> {
        return this.http.get<CreatorFieldInputText>(`fields/creator/input-text/${id}`);
    }

    /**
     * Create input text
     */
    createInputText(inputText: Partial<CreatorFieldInputText>): Observable<CreatorFieldInputText> {
        return this.http.post<CreatorFieldInputText>(`fields/creator/input-text`, inputText);
    }

    /**
     * Update input text
     */
    updateInputText(id, inputText: CreatorFieldInputText): Observable<CreatorFieldInputText> {
        return this.http.put<CreatorFieldInputText>(`fields/creator/input-text/${id}`, inputText);
    }

    /**
     * Delete input text by id
     */
    deleteInputText(id): Observable<unknown> {
        return this.http.delete<Field>(`fields/creator/input-text/${id}`);
    }
}
