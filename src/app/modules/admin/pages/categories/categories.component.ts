import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NzTreeNode } from 'ng-zorro-antd';
import arrayToTree from 'array-to-tree';
import { ModelService, CategoryService } from '../../../../core/services/';
import { Category, Model } from '../../../../core/models/models.dto';

/**
 * Todo:
 *  - close tooltip after save/update
 */

@Component({
    selector: 'app-models',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
    models: Model[] = [];
    categoryTree$: Observable<NzTreeNode[]>;

    constructor(private modelsService: ModelService, private categoryService: CategoryService) {}

    ngOnInit() {
        this.categoryTree$ = this.modelsService.getModels().pipe(
            tap(models => (this.models = models)),
            switchMap(() => this.categoryService.getCategories()),
            map(categories => this.transformArrayToTree(categories))
        );
    }

    getModelName(node: NzTreeNode): string {
        return this.models.find(model => model.id === node.origin.category.model_id).name;
    }

    add(parentNode: NzTreeNode, newCategory: Category): void {
        if (parentNode) {
            const parentCategory = parentNode.origin.category as Category;
            newCategory.parent_id = parentCategory.id;
        }
        this.categoryService.createCategory(newCategory).subscribe(res => {
            const node = this.createNodeFromCategory(res);
            parentNode.addChildren([...parentNode.getChildren(), node]);
        });
    }

    edit(node: NzTreeNode, updatedCategory: Category): void {
        this.categoryService.updateCategory(updatedCategory.id, updatedCategory).subscribe(res => {
            node.title = res.name;
            node.origin.category = res;
        });
    }

    delete(node: NzTreeNode): void {
        const category = node.origin.category as Category;
        this.categoryService.deleteCategory(category.id).subscribe(() => {
            node.remove();
        });
    }

    private transformArrayToTree(categories: Category[]): NzTreeNode[] {
        const createNodesTree = (cats: any[]): NzTreeNode[] => {
            return cats.map(cat => {
                const node = this.createNodeFromCategory(cat);

                if (cat.children) {
                    node.addChildren(createNodesTree(cat.children));
                }

                return node;
            });
        };

        return createNodesTree(arrayToTree(categories));
    }

    private createNodeFromCategory(category: Category, edit?: boolean): NzTreeNode {
        return new NzTreeNode({
            title: category.name,
            key: category.id,
            selectable: false,
            expanded: true,
            category,
        });
    }
}
