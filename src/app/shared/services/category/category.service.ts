import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NzCascaderOption } from 'ng-zorro-antd';
// todo we can do it on backend
import arrayToTree from 'array-to-tree';
import { Category } from '../../models/dto/category.entity';
import { CreateCategoryDto } from '../../models/dto/create-category.dto';
import { UpdateCategoryDto } from '../../models/dto/update-category.dto';

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
        return this.http.put<Category>(`/categories/${id}`, category);
    }

    /**
     * Delete category by id
     */
    deleteCategory(id: string): Observable<unknown> {
        return this.http.delete<Category>(`/categories/${id}`);
    }

    transformArrayToTree(categories: Category[]): NzCascaderOption[] {
        const createNodesTree = (cats: any[]): NzCascaderOption[] => {
            return cats.map(cat => {
                if (cat.children) {
                    cat.children = createNodesTree(cat.children);
                    cat.isLeaf = false;
                    return this.createCascaderOptionFromCategory(cat);
                }
                cat.isLeaf = true;
                return this.createCascaderOptionFromCategory(cat);
            });
        };
        return createNodesTree(arrayToTree(categories));
    }

    private createCascaderOptionFromCategory(category: any): NzCascaderOption {
        return {
            label: category.name,
            value: category.id,
            children: category.children,
            isLeaf: category.isLeaf,
        };
    }
}
