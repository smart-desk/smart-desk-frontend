import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Category } from '../../../../modules/category/models/category.entity';
import { CategoryStoreService } from '../../../../modules/category/category-store.service';
import { findChildren } from '../../../../utils';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-category-buttons',
    templateUrl: './category-buttons.component.html',
    styleUrls: ['./category-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryButtonsComponent implements OnInit, OnChanges {
    @Input()
    category: Category;

    @Input()
    size: 'sm' | 'lg' = 'sm';

    children$: Observable<Category[]>;

    constructor(private categoryStoreService: CategoryStoreService, private cdr: ChangeDetectorRef, private router: Router) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.category.currentValue !== changes.category.previousValue) {
            this.updateCategories();
        }
    }

    categorySelect(category: Category): void {
        this.router.navigate([`category/${category.id}`]);
    }

    private updateCategories(): void {
        this.children$ = this.categoryStoreService.categories$.pipe(map(categories => findChildren(this.category, categories)));
    }
}
