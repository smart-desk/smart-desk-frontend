import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { Category } from '../../../../../../modules/category/models/category.entity';
import { CreateProductDto } from '../../../../../../modules/product/models/product.dto';
import { Product } from '../../../../../../modules/product/models/product.entity';
import { cloneDeep } from 'lodash';
import { transformCategoryArrayToNZCascade } from '../../../../../../utils';
import { ProductService } from '../../../../../../modules/product/product.service';
import { CategoryStoreService } from '../../../../../../modules/category/category-store.service';
import { ModelService } from '../../../../../../modules/model/model.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductStatus } from '../../../../../../modules/product/models/product-status.enum';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreateComponent {
    selectedCategoriesIds: string[] = [];
    selectedCategory: Category;
    categories: Category[] = [];
    product: Product;
    categoryTree: NzCascaderOption[];
    loadingForm$ = new BehaviorSubject<boolean>(false);
    loadingCategories$ = new BehaviorSubject<boolean>(true);

    constructor(
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private categoryStoreService: CategoryStoreService,
        private productService: ProductService,
        private router: Router,
        private notificationService: NzNotificationService,
        private cdr: ChangeDetectorRef
    ) {
        this.categoryStoreService.categories$.subscribe(categories => {
            this.categories = [...categories];
            this.categoryTree = transformCategoryArrayToNZCascade(categories);
            this.loadingCategories$.next(false);
            this.cdr.markForCheck();
        });
    }

    onCategorySelect(selectedCategoriesIds: string[]): void {
        if (!selectedCategoriesIds || !selectedCategoriesIds.length) {
            return;
        }

        this.loadingForm$.next(true);

        const lastCategoryId = selectedCategoriesIds[selectedCategoriesIds.length - 1];
        const foundCategory = this.categories.find(cat => cat.id === lastCategoryId);
        if (foundCategory) {
            this.selectedCategory = foundCategory;
        }

        if (this.selectedCategory) {
            const modelId = this.selectedCategory.modelId;

            this.modelService
                .getModel(modelId)
                .pipe(take(1))
                .subscribe(model => {
                    this.product = new Product();
                    this.product.fields = cloneDeep(model.fields);
                    this.loadingForm$.next(false);
                });
        }
    }

    save(product: CreateProductDto): void {
        product.category_id = this.selectedCategory.id;
        product.model_id = this.selectedCategory.modelId;

        this.productService.createProduct(product).subscribe(
            () => {
                this.router.navigate(['profile', 'my-products'], { queryParams: { status: ProductStatus.PENDING } });
                this.notificationService.success('Объявление создано', 'Идет модерация, это займет некоторое время');
            },
            err => {
                if (err?.error?.statusCode === 400) {
                    this.notificationService.error('Проверьте правильность заполнения формы', err?.error?.message?.join(', '));
                } else {
                    this.notificationService.error('Что-то пошло не так', 'Попробуйте перезагрузить страницу');
                }
            }
        );
    }
}
