import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { Observable, Subject, zip } from 'rxjs';
import { Category } from '../../../../modules/category/models/category.entity';
import { GetProductsDto, GetProductsResponseDto } from '../../../../modules/product/models/product.dto';
import { ProductService } from '../../../../modules/product/product.service';
import { CategoryService } from '../../../../modules/category/category.service';
import { ProductStatus } from '../../../../modules/product/models/product-status.enum';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, OnDestroy {
    productResponse: GetProductsResponseDto;
    selectedItems = new Set<string>();
    categories: Category[] = [];
    status: ProductStatus;
    productStatus = ProductStatus;

    private destroy$ = new Subject();

    constructor(
        private productService: ProductService,
        private router: Router,
        private categoryService: CategoryService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParamMap
            .pipe(
                takeUntil(this.destroy$),
                tap(paramMap => {
                    this.status = paramMap.get('status') as ProductStatus;
                    this.cd.detectChanges();
                })
            )
            .subscribe(paramMap => {
                const options = new GetProductsDto();
                if (paramMap.get('page')) {
                    options.page = Number(paramMap.get('page'));
                }
                this.cd.detectChanges();
                this.getProducts(options);
            });

        this.categoryService.getCategories().subscribe(categories => (this.categories = categories));
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    bulkAction(action: 'delete' | 'block' | 'publish'): void {
        let requests = [];
        switch (action) {
            case 'delete':
                requests = [...this.selectedItems.values()].map(id => this.productService.deleteProduct(id));
                break;
            case 'block':
                requests = [...this.selectedItems.values()].map(id => this.productService.blockProduct(id));
                break;
            case 'publish':
                requests = [...this.selectedItems.values()].map(id => this.productService.publishProduct(id));
                break;
        }

        zip(...requests).subscribe(() => {
            this.selectedItems.clear();
            this.cd.detectChanges();
            this.getProducts();
        });
    }

    delete(id: string): void {
        this.productService.deleteProduct(id).subscribe(() => {
            this.productResponse.products = this.productResponse.products.filter(item => item.id !== id);
            this.cd.detectChanges();
        });
    }

    block(id: string): void {
        this.productService.blockProduct(id).subscribe(() => {
            this.getProducts();
        });
    }

    publish(id: string): void {
        this.productService.publishProduct(id).subscribe(() => {
            this.getProducts();
        });
    }

    updateSelectedItems(id: string, checked: boolean): void {
        if (checked) {
            this.selectedItems.add(id);
        } else {
            this.selectedItems.delete(id);
        }
    }

    changePage(page: number): void {
        if (page !== this.productResponse.page) {
            this.router.navigate([], { queryParams: { page }, queryParamsHandling: 'merge' });
        }
    }

    // todo make it as a pipe
    formatDate(date: Date | string): string {
        return dayjs(date).format('DD MMM YYYY HH:mm');
    }

    getCategoryName(id: string): string {
        const categoryProduct = this.categories.find(category => category.id === id);
        return categoryProduct ? categoryProduct.name : 'Категория не определена';
    }

    changeStatus(): void {
        this.selectedItems.clear();
        this.cd.detectChanges();
        this.router.navigate([], { queryParams: { status: this.status } });
    }

    private getProducts(options?: GetProductsDto): void {
        let req: Observable<GetProductsResponseDto>;
        switch (this.status) {
            case ProductStatus.PENDING:
                req = this.productService.getPending(options);
                break;
            case ProductStatus.BLOCKED:
                req = this.productService.getBlocked(options);
                break;
            case ProductStatus.COMPLETED:
                req = this.productService.getCompleted(options);
                break;
            case ProductStatus.ACTIVE:
            default:
                req = this.productService.getProducts(options);
                break;
        }

        req.subscribe(res => {
            this.productResponse = res;
            this.cd.detectChanges();
        });
    }
}
