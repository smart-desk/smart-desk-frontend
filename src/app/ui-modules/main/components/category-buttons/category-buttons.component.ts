import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Category } from '../../../../modules/category/models/category.entity';
import { CategoryService } from '../../../../modules/category/category.service';
import { findChildren } from '../../../../utils';

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

    children: Category[];

    constructor(private categoryService: CategoryService, private cdr: ChangeDetectorRef, private router: Router) {}

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
        this.categoryService
            .getCategories()
            .pipe(map(categories => findChildren(this.category, categories)))
            .subscribe(children => {
                this.children = children;
                this.cdr.detectChanges();
            });
    }
}
