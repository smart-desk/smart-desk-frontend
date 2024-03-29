import { ChangeDetectionStrategy, Component, OnInit, ViewChildren } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Model } from '../../../../modules/model/models/model.entity';
import { Category } from '../../../../modules/category/models/category.entity';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { createNode, transformCategoryArrayToNZTree } from '../../../../utils';
import { ModelService } from '../../../../modules/model/model.service';
import { CategoryService } from '../../../../modules/category/category.service';

@Component({
    selector: 'app-categories',
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
                map(categories => transformCategoryArrayToNZTree(categories))
            )
            .subscribe(tree => {
                this.categoryTree$.next(tree);
            });
    }

    getModelName(node: NzTreeNode): string {
        return this.models.find(model => model.id === node.origin.category.modelId)?.name || '';
    }

    add(parentNode: NzTreeNode | null, newCategory: Category): void {
        if (parentNode) {
            const parentCategory = parentNode.origin.category;
            newCategory.parentId = parentCategory.id;
        }
        this.categoryService.createCategory(newCategory).subscribe(res => {
            const node = createNode(res);
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
        const category = node.origin.category;
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

    private closeForms(): void {
        this.popovers.forEach(popover => popover.hide());
    }
}
