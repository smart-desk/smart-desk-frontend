import { Observable, of } from 'rxjs';
import { Model } from '../../models/models.dto';

const modelFake: Model = {
    id: '000',
    name: 'Test Model',
    sections: [],
};

export class ModelServiceFake {
    getModels(): Observable<Model[]> {
        return of([]);
    }

    getModel(id: string): Observable<Model> {
        return of(modelFake);
    }

    createModel(model: Partial<Model>): Observable<Model> {
        return of(modelFake);
    }

    updateModel(id, model: Partial<Model>): Observable<Model> {
        return of(modelFake);
    }

    deleteModel(id): Observable<void> {
        return of();
    }
}
