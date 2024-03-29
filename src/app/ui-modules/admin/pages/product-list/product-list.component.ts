import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { Observable, Subject, zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../../../modules/category/models/category.entity';
import { GetProductsResponseDto } from '../../../../modules/product/models/product.dto';
import { ProductService } from '../../../../modules/product/product.service';
import { CategoryService } from '../../../../modules/category/category.service';
import { ProductStatus } from '../../../../modules/product/models/product-status.enum';
import { ProductDataService } from '../../../../modules/product/product-data.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ProductBlockReasonFormComponent } from '../../components/product-block-reason-form/product-block-reason-form.component';
import { BlockProductDto } from '../../../../modules/product/models/block-product.dto';
import { Product } from '../../../../modules/product/models/product.entity';

interface AdminActionData {
    title: string;
    action: (id: string) => {};
    icon: string;
    actionName: AdminAction;
    bulk: boolean;
}

enum AdminAction {
    DELETE = 'delete',
    BLOCK = 'block',
    PUBLISH = 'publish',
}

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, OnDestroy {
    loading = false;
    productResponse: GetProductsResponseDto;
    selectedItems = new Set<string>();
    categories: Category[] = [];
    status: ProductStatus;
    productStatus = ProductStatus;
    searchValue = '';

    private destroy$ = new Subject();
    private actions: Map<AdminAction, AdminActionData> = new Map([
        [
            AdminAction.DELETE,
            { title: 'Удалить', action: this.deleteProduct.bind(this), icon: 'delete', actionName: AdminAction.DELETE, bulk: true },
        ],
        [
            AdminAction.BLOCK,
            {
                title: 'Заблокировать',
                action: this.openBlockProductReasonModal.bind(this),
                icon: 'dislike',
                actionName: AdminAction.BLOCK,
                bulk: false,
            },
        ],
        [
            AdminAction.PUBLISH,
            {
                title: 'Опубликовать',
                action: this.publishProduct.bind(this),
                icon: 'like',
                actionName: AdminAction.PUBLISH,
                bulk: true,
            },
        ],
    ]);

    constructor(
        private productService: ProductService,
        private router: Router,
        private categoryService: CategoryService,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private productDataService: ProductDataService,
        private modalService: NzModalService
    ) {}

    ngOnInit(): void {
        this.productDataService.events$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            this.loading = true;
            this.cdr.detectChanges();
        });

        this.productDataService.products$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.productResponse = res;
            this.loading = false;
            this.cdr.detectChanges();
        });

        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
            this.cdr.detectChanges();
        });

        const options = this.productDataService.getProductOptionsFromQuery(this.route.snapshot.queryParamMap);
        this.productDataService.loadProducts(null, options);
        this.status = options.status || ProductStatus.ACTIVE;
        this.searchValue = options.search || '';
        this.cdr.markForCheck();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getPossibleActions(status: ProductStatus): (AdminActionData | undefined)[] {
        switch (status) {
            case ProductStatus.ACTIVE:
                return [this.actions.get(AdminAction.BLOCK), this.actions.get(AdminAction.DELETE)];
            case ProductStatus.PENDING:
                return [this.actions.get(AdminAction.PUBLISH), this.actions.get(AdminAction.BLOCK), this.actions.get(AdminAction.DELETE)];
            case ProductStatus.BLOCKED:
                return [this.actions.get(AdminAction.PUBLISH), this.actions.get(AdminAction.DELETE)];
            case ProductStatus.COMPLETED:
                return [this.actions.get(AdminAction.PUBLISH), this.actions.get(AdminAction.BLOCK), this.actions.get(AdminAction.DELETE)];
        }
    }

    bulkAction(action: AdminAction): void {
        let requests: Observable<Product>[] = [];
        switch (action) {
            case AdminAction.DELETE:
                requests = [...this.selectedItems.values()].map(id => this.productService.deleteProduct(id));
                break;
            case AdminAction.PUBLISH:
                requests = [...this.selectedItems.values()].map(id => this.productService.publishProduct(id));
                break;
        }

        zip(...requests).subscribe(() => {
            this.selectedItems.clear();
            this.cdr.markForCheck();
            this.productDataService.reloadProducts();
        });
    }

    deleteProduct(id: string): void {
        this.productService.deleteProduct(id).subscribe(() => {
            this.productResponse.products = this.productResponse.products.filter(item => item.id !== id);
            this.cdr.detectChanges();
        });
    }

    blockProduct(id: string, reason: string, modalRef?: NzModalRef): void {
        const blockProductDto = new BlockProductDto();
        blockProductDto.reason = reason;
        this.productService.blockProduct(id, blockProductDto).subscribe(() => {
            this.productDataService.reloadProducts();
            if (modalRef) {
                modalRef.close();
            }
        });
    }

    publishProduct(id: string): void {
        this.productService.publishProduct(id).subscribe(() => {
            this.productDataService.reloadProducts();
        });
    }

    onAllChecked(checked: boolean): void {
        if (checked) {
            this.productResponse?.products?.forEach(p => this.selectedItems.add(p.id));
        } else {
            this.selectedItems.clear();
        }
        this.cdr.detectChanges();
    }

    updateSelectedItems(id: string, checked: boolean): void {
        if (checked) {
            this.selectedItems.add(id);
        } else {
            this.selectedItems.delete(id);
        }
    }

    search(): void {
        this.productDataService.search(this.searchValue);
    }

    resetSearch(): void {
        this.searchValue = '';
        this.productDataService.search('');
    }

    changePage(page: number): void {
        this.productDataService.changePage(page);
    }

    changeStatus(status: ProductStatus): void {
        this.selectedItems.clear();
        this.status = status;
        this.productDataService.changeStatus(status);
        this.cdr.markForCheck();
    }

    // todo make it as a pipe
    formatDate(date: Date | string): string {
        return dayjs(date).format('DD MMM YYYY HH:mm');
    }

    // todo make it as a pipe
    getCategoryName(id: string): string {
        const categoryProduct = this.categories.find(category => category.id === id);
        return categoryProduct ? categoryProduct.name : 'Категория не определена';
    }

    openBlockProductReasonModal(id: string): void {
        const modalReasonRef: NzModalRef = this.modalService.create<ProductBlockReasonFormComponent>({
            nzTitle: 'Укажите причину блокировки',
            nzContent: ProductBlockReasonFormComponent,
            nzFooter: [
                {
                    label: 'Отмена',
                    onClick: () => modalReasonRef.close(),
                },
                {
                    label: 'Заблокировать',
                    type: 'primary',
                    danger: true,
                    disabled: modal => !modal?.form?.valid,
                    onClick: () => {
                        const reason = modalReasonRef.getContentComponent().form.get('reason')?.value;
                        this.blockProduct(id, reason, modalReasonRef);
                    },
                },
            ],
        });
    }
}
