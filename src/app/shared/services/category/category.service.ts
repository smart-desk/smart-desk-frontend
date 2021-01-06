import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// todo we can do it on backend
import arrayToTree from 'array-to-tree';
import { Category } from '../../models/dto/category.entity';
import { CreateCategoryDto } from '../../models/dto/create-category.dto';
import { UpdateCategoryDto } from '../../models/dto/update-category.dto';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) {}

    /**
     * Returns tree of categories
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
