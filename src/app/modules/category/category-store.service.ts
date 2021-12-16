import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Category } from './models/category.entity';
import { CategoryService } from './category.service';
import { isNil } from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class CategoryStoreService {
    private categories = new BehaviorSubject<Category[] | null>(null);

    constructor(private http: HttpClient, private categoryService: CategoryService) {
        this.categoryService.getCategories().subscribe(res => {
            this.categories.next(res);
        });
    }

    get categories$(): Observable<Category[]> {
        return this.categories.pipe(filter(value => !isNil(value))) as Observable<Category[]>;
    }

    getCategory(id: Category['id']): Observable<Category | undefined> {
        return this.categories$.pipe(map(categories => categories.find(c => c.id === id)));
    }
}
