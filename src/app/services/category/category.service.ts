import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// todo we can do it on backend
import arrayToTree from 'array-to-tree';
import { Category } from '../../models/category/category.entity';
import { CreateCategoryDto } from '../../models/category/create-category.dto';
import { UpdateCategoryDto } from '../../models/category/update-category.dto';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { TransformMode } from '../../models/category/transform-mode.enum';

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

    transformArrayToTree(categories: Category[], transformMode: TransformMode): NzCascaderOption[] | NzTreeNode[] {
        const createCascadesTree = (rootCats: any[], childCats: any[]): NzCascaderOption[] => {
            return rootCats.map(cat => {
                cat.children = childCats.filter(category => category.parentId === cat.id);
                if (cat.children.length) {
                    cat.isLeaf = true;
                    cat.children = createCascadesTree(cat.children, childCats);
                }
                cat.isLeaf = false;
                return this.createCascaderOptionFromCategory(cat);
            });
        };
        const createNodesTree = (rootCats: any[], childCats: any[]): NzTreeNode[] => {
            return rootCats.map(cat => {
                cat.children = childCats.filter(category => category.parentId === cat.id);
                const node = this.createNodeFromCategory(cat);

                if (cat.children.length) {
                    node.addChildren(createNodesTree(cat.children, childCats));
                }
                return node;
            });
        };
        const rootCategories = categories.filter(cat => cat.parentId === null);
        const childCategories = categories.filter(cat => cat.parentId !== null);
        if (transformMode === TransformMode.NODE) {
            return createNodesTree(arrayToTree(rootCategories), arrayToTree(childCategories));
        }
        return createCascadesTree(arrayToTree(rootCategories), arrayToTree(childCategories));
    }

    createNodeFromCategory(category: Category): NzTreeNode {
        return new NzTreeNode({
            title: category.name,
            key: category.id,
            selectable: false,
            expanded: true,
            category,
        });
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
