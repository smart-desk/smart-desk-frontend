import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/models.dto';
import { NzCascaderOption } from 'ng-zorro-antd';
import arrayToTree from 'array-to-tree';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) {}

    /**
     * Returns array of existing categories
     */
    public getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`/categories`);
    }

    /**
     * Return category by id
     */
    public getCategory(id: string): Observable<Category> {
        return this.http.get<Category>(`/categories/${id}`);
    }

    /**
     * Create сategory
     */
    public createCategory(category: Partial<Category>): Observable<Category> {
        return this.http.post<Category>(`/categories`, category);
    }

    /**
     * Update category by id
     */
    public updateCategory(id, category: Partial<Category>): Observable<Category> {
        return this.http.put<Category>(`/categories/${id}`, category);
    }

    /**
     * Delete category by id
     */
    public deleteCategory(id): Observable<unknown> {
        return this.http.delete<Category>(`/categories/${id}`);
    }

    public transformArrayToTree(categories: Category[]): NzCascaderOption[] {
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
