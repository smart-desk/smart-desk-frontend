import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// todo we can do it on backend
import { Category } from './models/category.entity';
import { CreateCategoryDto } from './models/create-category.dto';
import { UpdateCategoryDto } from './models/update-category.dto';

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
     * Create сategory
     */
    createCategory(category: CreateCategoryDto): Observable<Category> {
        return this.http.post<Category>(`/categories`, category);
    }

    /**
     * Update category by id
     */
    updateCategory(id: string, category: UpdateCategoryDto): Observable<Category> {
        return this.http.patch<Category>(`/categories/${id}`, category);
    }

    /**
     * Delete category by id
     */
    deleteCategory(id: string): Observable<unknown> {
        return this.http.delete<Category>(`/categories/${id}`);
    }
}
