import { ChangeDetectionStrategy, Component, OnInit, ViewChildren } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import arrayToTree from 'array-to-tree';
import { BehaviorSubject } from 'rxjs';
import { CategoryService, ModelService } from '../../../../shared/services/';
import { Model } from '../../../../shared/models/model/model.entity';
import { Category } from '../../../../shared/models/category/category.entity';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';

@Component({
    selector: 'app-models',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
    models: Model[] = [];
    categoryTree$ = new BehaviorSubject<NzTreeNode[]>([]);

    @ViewChildren(NzPopoverDirective)
    private popovers: NzPopoverDirective[];

    constructor(private modelsService: ModelService, private categoryService: CategoryService) {}

    ngOnInit() {
        this.modelsService
            .getModels()
            .pipe(
                tap(models => (this.models = models)),
                switchMap(() => this.categoryService.getCategories()),
                map(categories => this.transformArrayToTree(categories))
            )
            .subscribe(tree => {
                this.categoryTree$.next(tree);
            });
    }

    getModelName(node: NzTreeNode): string {
        return this.models.find(model => model.id === node.origin.category.modelId).name;
    }

    add(parentNode: NzTreeNode, newCategory: Category): void {
        if (parentNode) {
            const parentCategory = parentNode.origin.category as Category;
            newCategory.parentId = parentCategory.id;
        }
        this.categoryService.createCategory(newCategory).subscribe(res => {
            const node = this.createNodeFromCategory(res);
            if (parentNode) {
                parentNode.addChildren([node]);
            } else {
                this.categoryTree$.next([...this.categoryTree$.getValue(), node]);
            }
            this.closeForms();
        });
    }

    edit(node: NzTreeNode, updatedCategory: Category): void {
        this.categoryService.updateCategory(updatedCategory.id, updatedCategory).subscribe(res => {
            node.title = res.name;
            node.origin.category = res;
            this.closeForms();
        });
    }

    delete(node: NzTreeNode): void {
        const category = node.origin.category as Category;
        this.categoryService.deleteCategory(category.id).subscribe(() => {
            if (node.getParentNode()) {
                node.remove();
            } else {
                node.remove();
                const tree = this.categoryTree$.getValue();
                this.categoryTree$.next(tree.filter(branch => branch !== node));
            }
        });
    }

    cancel(): void {
        this.closeForms();
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

    private createNodeFromCategory(category: Category): NzTreeNode {
        return new NzTreeNode({
            title: category.name,
            key: category.id,
            selectable: false,
            expanded: true,
            category,
        });
    }

    private closeForms(): void {
        this.popovers.forEach(popover => popover.hide());
    }
}
