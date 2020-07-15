import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatorFieldInputText, Field, Model, ModelExtended } from '../../models/models.dto';
import { environment } from '../../../../environments/environment';

// todo move adding environment api variable to interceptor

@Injectable()
export class CreatorFieldInputTextService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array with one element of input text for specified field id
     */
    public getInputTextsByFieldID(fieldID: string): Observable<CreatorFieldInputText[]> {
        return this.http.get<CreatorFieldInputText[]>(`${environment.apiURL}fields/creator/input-text?field_id=${fieldID}`);
    }

    /**
     * Returns input text by id
     */
    public getInputText(id: string): Observable<CreatorFieldInputText> {
        return this.http.get<CreatorFieldInputText>(`${environment.apiURL}fields/creator/input-text/${id}`);
    }

    /**
     * Create input text
     */
    public createInputText(inputText: Partial<CreatorFieldInputText>): Observable<CreatorFieldInputText> {
        return this.http.post<CreatorFieldInputText>(`${environment.apiURL}fields/creator/input-text`, inputText);
    }

    /**
     * Update input text
     */
    public updateInputText(id, inputText: CreatorFieldInputText): Observable<CreatorFieldInputText> {
        return this.http.put<CreatorFieldInputText>(`${environment.apiURL}fields/creator/input-text/${id}`, inputText);
    }

    /**
     * Delete input text by id
     */
    public deleteInputText(id): Observable<unknown> {
        return this.http.delete<Field>(`${environment.apiURL}fields/creator/input-text/${id}`);
    }
}
