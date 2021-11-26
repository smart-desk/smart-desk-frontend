import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

@Component({
    selector: 'app-category-menu',
    templateUrl: './category-menu.component.html',
    styleUrls: ['./category-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryMenuComponent {
    @Input() categoryTree: NzCascaderOption[];
    @Output() selectCategory = new EventEmitter<string>(true);

    category: NzCascaderOption | null;
    parentCategory: NzCascaderOption;
    lastCategory: NzCascaderOption | null;
    constructor(private cd: ChangeDetectorRef) {}

    categoryHover(category?: NzCascaderOption): void {
        // todo: костальное решение, можно придумать лучше или найти компоненту
        if (category) {
            if (category.children?.length) {
                this.parentCategory = { ...category };
            }
            this.category = null;
            this.cd.detectChanges();
            this.category = { ...category };
        } else {
            if (!this.lastCategory?.children?.length) {
                this.category = null;
                this.cd.detectChanges();
                this.category = this.parentCategory;
            } else {
                this.category = null;
            }
        }
        this.lastCategory = this.category;
        this.cd.detectChanges();
    }

    categorySelect(value: string, e: Event): void {
        e.stopPropagation();
        this.selectCategory.emit(value);
    }
}
