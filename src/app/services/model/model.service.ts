import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../../models/model/model.entity';
import { ModelCreateDto, ModelUpdateDto } from '../../models/model/model.dto';

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
    getModel(id: string): Observable<Model> {
        return this.http.get<Model>(`/models/${id}`);
    }

    /**
     * Create model
     */
    createModel(model: ModelCreateDto): Observable<Model> {
        return this.http.post<Model>(`/models`, model);
    }

    /**
     * Update model by id
     */
    updateModel(id: string, model: ModelUpdateDto): Observable<Model> {
        return this.http.put<Model>(`/models/${id}`, model);
    }

    /**
     * Delete model by id
     */
    deleteModel(id: string): Observable<unknown> {
        return this.http.delete<Model>(`/models/${id}`);
    }
}
