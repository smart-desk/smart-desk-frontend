import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../../modules/category/models/category.entity';
import { CategoryService } from '../../../../modules/category/category.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-category-menu',
    templateUrl: './category-menu.component.html',
    styleUrls: ['./category-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryMenuComponent implements OnInit, OnDestroy {
    @Input() categoryActive: Category;
    @Output() selectCategory = new EventEmitter<string>(true);
    categories: Category[] = [];
    parentCategories$ = new Subject<Category[]>();
    childCategories$ = new Subject<Category[]>();
    hoverImg: string;
    private changeRootCategory$ = new Subject<Category>();
    private destroy$ = new Subject();
    constructor(private cd: ChangeDetectorRef, private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(cats => {
            this.categories = cats;
            this.parentCategories$.next(cats.filter(cat => !cat.parentId));
            this.cd.detectChanges();
        });

        this.parentCategories$.pipe().subscribe(cats => this.childCategories$.next(cats.filter(cat => !!cat.parentId)));

        this.changeRootCategory$.subscribe(cat => {
            this.categoryActive = cat;
            if (!cat.parentId) {
                this.childCategories$.next(this.categories.filter(childCat => childCat.parentId === cat.id));
                this.cd.detectChanges();
            }
        });

        if (this.categoryActive) {
            this.changeRootCategory$.next(this.categoryActive);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    categoryHover(category?: Category): void {
        if (category) {
            this.hoverImg = category.img;
        } else {
            this.hoverImg = '';
        }
        this.cd.detectChanges();
    }

    selectRoot(cat: Category, e: Event): void {
        e.stopPropagation();
        if (this.categoryActive?.id === cat.id) {
            this.selectCategory.emit(cat.id);
        }
        this.changeRootCategory$.next(cat);
    }

    selectChild(cat: Category, e: Event): void {
        e.stopPropagation();
        this.selectCategory.emit(cat.id);
    }
}
