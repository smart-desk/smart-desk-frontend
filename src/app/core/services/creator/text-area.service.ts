import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatorFieldTextArea, Field } from '../../models/models.dto';

// todo move adding environment api variable to interceptor

@Injectable()
export class CreatorFieldTextAreaService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array with one element of input text for specified field id
     */
    getTextAreasByFieldID(fieldID: string): Observable<CreatorFieldTextArea[]> {
        return this.http.get<CreatorFieldTextArea[]>(`${environment.apiURL}fields/creator/text-area?field_id=${fieldID}`);
    }

    /**
     * Returns input text by id
     */
    getTextArea(id: string): Observable<CreatorFieldTextArea> {
        return this.http.get<CreatorFieldTextArea>(`${environment.apiURL}fields/creator/text-area/${id}`);
    }

    /**
     * Create input text
     */
    createTextArea(textArea: Partial<CreatorFieldTextArea>): Observable<CreatorFieldTextArea> {
        return this.http.post<CreatorFieldTextArea>(`${environment.apiURL}fields/creator/text-area`, textArea);
    }

    /**
     * Update input text
     */
    updateTextArea(id, textArea: CreatorFieldTextArea): Observable<CreatorFieldTextArea> {
        return this.http.put<CreatorFieldTextArea>(`${environment.apiURL}fields/creator/TextArea/${id}`, textArea);
    }

    /**
     * Delete input text by id
     */
    deleteTextArea(id): Observable<unknown> {
        return this.http.delete<Field>(`${environment.apiURL}fields/creator/TextArea/${id}`);
    }
}
