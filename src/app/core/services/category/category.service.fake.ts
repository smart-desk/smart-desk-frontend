import { Observable, of } from 'rxjs';
import { Category } from '../../models/models.dto';

const categoryFake = {
    id: '000',
    model_id: '001',
    parent_id: '002',
    name: 'Test Category',
};

export class CategoryServiceFake {
    getCategories(): Observable<Category[]> {
        return of([]);
    }

    getCategory(id: string): Observable<Category> {
        return of(categoryFake);
    }

    createCategory(category: Partial<Category>): Observable<Category> {
        return of(categoryFake);
    }

    updateCategory(id, category: Partial<Category>): Observable<Category> {
        return of(categoryFake);
    }

    deleteCategory(id): Observable<unknown> {
        return of();
    }
}
