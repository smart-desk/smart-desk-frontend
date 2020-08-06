import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatorFieldRadio, Field } from '../../models/models.dto';

@Injectable()
export class CreatorFieldRadioService {
    constructor(private http: HttpClient) {}

    getRadioByFieldID(fieldID: string): Observable<CreatorFieldRadio[]> {
        return this.http.get<CreatorFieldRadio[]>(`/fields/creator/radio?field_id=${fieldID}`);
    }

    getRadio(id: string): Observable<CreatorFieldRadio> {
        return this.http.get<CreatorFieldRadio>(`/fields/creator/radio/${id}`);
    }

    createRadio(field: Partial<CreatorFieldRadio>): Observable<CreatorFieldRadio> {
        return this.http.post<CreatorFieldRadio>(`/fields/creator/radio`, field);
    }

    updateRadio(id, field: CreatorFieldRadio): Observable<CreatorFieldRadio> {
        return this.http.put<CreatorFieldRadio>(`/fields/creator/radio/${id}`, field);
    }

    deleteRadio(id): Observable<unknown> {
        return this.http.delete<Field>(`/fields/creator/radio/${id}`);
    }
}
