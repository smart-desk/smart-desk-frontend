import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Category } from '../../../../modules/category/models/category.entity';

@Component({
    selector: 'app-category-menu',
    templateUrl: './category-menu.component.html',
    styleUrls: ['./category-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryMenuComponent implements OnChanges {
    @Input()
    activeCategory: Category;

    @Input()
    categories: Category[];

    @Output()
    selectCategory = new EventEmitter<string>(true);

    hoveredCategory: Category | null;
    selectedCategories: string[] = [];
    showCategoryLevels = [0, 1, 2];

    constructor(private cd: ChangeDetectorRef) {}

    ngOnChanges() {
        if (this.activeCategory && this.categories) {
            this.selectedCategories = this.getCategoryIdChain(this.activeCategory.id);
            this.cd.markForCheck();
        }
    }

    getCategoriesByLevel(level: number): Category[] {
        if (level === 0) {
            return this.categories?.filter(category => !category.parentId);
        } else {
            const parentCategoryId = this.selectedCategories[level - 1];
            return this.categories.filter(category => category.parentId === parentCategoryId);
        }
    }

    isSelected(categoryId: string): boolean {
        return this.selectedCategories.includes(categoryId);
    }

    onCategoryHover(category?: Category | undefined): void {
        if (category) {
            this.hoveredCategory = category;
        } else {
            this.hoveredCategory = null;
        }
        this.cd.markForCheck();
    }

    onSelectCategory(category: Category, e: Event, categoryLevel: number): void {
        e.stopPropagation();

        if (this.isLeafCategory(category.id) || this.isSelected(category.id) || categoryLevel >= Math.max(...this.showCategoryLevels)) {
            this.selectCategory.emit(category.id);
        } else {
            this.selectedCategories = this.getCategoryIdChain(category.id);
            this.cd.markForCheck();
        }
    }

    isParentCategory(categoryId: string): boolean {
        return this.categories.some(category => category.parentId === categoryId);
    }

    private getCategoryIdChain(targetCategoryId: string): string[] {
        const targetCategory = this.categories.find(category => category.id === targetCategoryId);
        if (!targetCategory) {
            return [];
        }

        if (targetCategory.parentId) {
            return [...this.getCategoryIdChain(targetCategory.parentId), targetCategory.id];
        }

        return [targetCategory.id];
    }

    private isLeafCategory(categoryId: string): boolean {
        return !this.categories.some(category => category.parentId === categoryId);
    }
}
