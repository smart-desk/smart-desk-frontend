import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelExtended } from '../../models/models.dto';

// todo move adding environment api variable to interceptor
@Injectable()
export class ModelService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array of existing models
     */
    getModels(): Observable<Model[]> {
        return this.http.get<Model[]>(`/models`);
    }

    /**
     * Return model by id
     */
    getModel(id: string): Observable<ModelExtended> {
        return this.http.get<ModelExtended>(`/models/${id}/full`);
    }

    /**
     * Create model
     */
    createModel(model: Partial<Model>): Observable<Model> {
        return this.http.post<Model>(`/models`, model);
    }

    /**
     * Update model by id
     */
    updateModel(id, model: Partial<Model>): Observable<Model> {
        return this.http.put<Model>(`/models/${id}`, model);
    }

    /**
     * Delete model by id
     */
    deleteModel(id): Observable<unknown> {
        return this.http.delete<Model>(`/models/${id}`);
    }
}
