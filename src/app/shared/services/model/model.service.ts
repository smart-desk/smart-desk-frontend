import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model, ModelExtended } from '../../models/models.dto';
import { environment } from '../../../../environments/environment';

// todo move adding environment api variable to interceptor

@Injectable({
    providedIn: 'root',
})
export class ModelService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array of existing models
     */
    public getModels(): Observable<Model[]> {
        return this.http.get<Model[]>(`${environment.apiURL}models`);
    }

    /**
     * Return model by id
     */
    public getModel(id: string): Observable<ModelExtended> {
        return this.http.get<ModelExtended>(`${environment.apiURL}models/${id}/full`);
    }

    /**
     * Create model
     */
    public createModel(model: Model): Observable<Model> {
        return this.http.post<Model>(`${environment.apiURL}models`, model);
    }

    /**
     * Update model by id
     */
    public updateModel(id, model: Model): Observable<Model> {
        return this.http.put<Model>(`${environment.apiURL}models/${id}`, model);
    }

    /**
     * Delete model by id
     */
    public deleteModel(id): Observable<unknown> {
        return this.http.delete<Model>(`${environment.apiURL}models/${id}`);
    }
}
