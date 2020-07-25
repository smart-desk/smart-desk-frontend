import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/models.dto';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array of existing categories
     */
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`/categories`);
    }

    /**
     * Return category by id
     */
    getCategory(id: string): Observable<Category> {
        return this.http.get<Category>(`/categories/${id}`);
    }

    /**
     * Create model
     */
    createCategory(category: Partial<Category>): Observable<Category> {
        return this.http.post<Category>(`/categories`, category);
    }

    /**
     * Update category by id
     */
    updateCategory(id, category: Partial<Category>): Observable<Category> {
        return this.http.put<Category>(`/categories/${id}`, category);
    }

    /**
     * Delete category by id
     */
    deleteCategory(id): Observable<unknown> {
        return this.http.delete<Category>(`/categories/${id}`);
    }
}
