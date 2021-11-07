import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { User } from '../../../../../../modules/user/models/user.entity';
import { ExtraActions } from '../../../../components/product-card/product-card.component';
import { Product } from '../../../../../../modules/product/models/product.entity';
import { ProductService } from '../../../../../../modules/product/product.service';
import { UserService } from '../../../../../../modules/user/user.service';
import { StripeService } from '../../../../../../modules/stripe/stripe.service';
import { PromoSetChooserComponent } from '../../../../components/promo-set-chooser/promo-set-chooser.component';
import { ProductStatus } from '../../../../../../modules/product/models/product-status.enum';
import { ProductDataService } from '../../../../../../modules/product/product-data.service';

@Component({
    selector: 'app-my-products',
    templateUrl: './my-products.component.html',
    styleUrls: ['./my-products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyProductsComponent implements OnInit, OnDestroy {
    productResponse: GetProductsResponseDto;
    user: User;
    destroy$ = new Subject();
    status: ProductStatus;
    loading = false;

    activeProductsActions: ExtraActions[] = [
        {
            title: 'Поднять',
            action: this.liftProduct.bind(this),
        },
        {
            title: 'Продвинуть',
            action: this.promoteProduct.bind(this),
        },
        {
            title: 'Завершить',
            action: this.completeProduct.bind(this),
        },
        {
            title: 'Редактировать',
            action: this.editProduct.bind(this),
        },
        {
            title: 'Удалить',
            action: this.deleteProduct.bind(this),
        },
    ];
    completedProductsActions: ExtraActions[] = [
        {
            title: 'Удалить',
            action: this.deleteProduct.bind(this),
        },
    ];
    pendingProductsActions: ExtraActions[] = [
        {
            title: 'Удалить',
            action: this.deleteProduct.bind(this),
        },
    ];
    blockedProductsActions: ExtraActions[] = [
        {
            title: 'Удалить',
            action: this.deleteProduct.bind(this),
        },
    ];

    tabs = [
        {
            title: 'Активные',
            status: ProductStatus.ACTIVE,
            actions: this.activeProductsActions,
            isActive: (currentStatus: ProductStatus) => currentStatus === ProductStatus.ACTIVE,
        },
        {
            title: 'На модерации',
            status: ProductStatus.PENDING,
            actions: this.pendingProductsActions,
            isActive: (currentStatus: ProductStatus) => currentStatus === ProductStatus.PENDING,
        },
        {
            title: 'Заблокированные',
            status: ProductStatus.BLOCKED,
            actions: this.blockedProductsActions,
            isActive: (currentStatus: ProductStatus) => currentStatus === ProductStatus.BLOCKED,
        },
        {
            title: 'Завершенные',
            status: ProductStatus.COMPLETED,
            actions: this.completedProductsActions,
            isActive: (currentStatus: ProductStatus) => currentStatus === ProductStatus.COMPLETED,
        },
    ];

    constructor(
        private productService: ProductService,
        private cdr: ChangeDetectorRef,
        private userService: UserService,
        private router: Router,
        private stripeService: StripeService,
        private modalService: NzModalService,
        private productDataService: ProductDataService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.productDataService.events$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.loading = true;
            this.cdr.markForCheck();
        });

        this.productDataService.products$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.productResponse = res;
            this.loading = false;
            this.cdr.markForCheck();
        });

        this.userService
            .getCurrentUser()
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
                const options = this.productDataService.getProductOptionsFromQuery(this.route.snapshot.queryParamMap);
                options.user = user.id;

                this.productDataService.loadProducts(null, options);

                this.status = options.status || ProductStatus.ACTIVE;
                this.user = user;

                this.cdr.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changeStatus(status: ProductStatus): void {
        this.status = status;
        this.cdr.markForCheck();
        this.productDataService.changeStatus(this.status);
    }

    getSelectedTabIndex(): number {
        return this.tabs.findIndex(tab => tab.isActive(this.status));
    }

    private completeProduct(product: Product): void {
        this.productService.completeProduct(product.id).subscribe(() => {
            this.productDataService.reloadProducts();
        });
    }

    private editProduct(product: Product): void {
        this.router.navigate(['products', product.id, 'edit']);
    }

    private deleteProduct(product: Product): void {
        this.productService.deleteProduct(product.id).subscribe(() => {
            this.productDataService.reloadProducts();
        });
    }

    private liftProduct(product: Product): void {
        if (this.stripeService.stripe) {
            this.productService
                .liftProduct(product.id)
                .pipe(switchMap(res => from(this.stripeService.stripe.redirectToCheckout({ sessionId: res.id }))))
                .subscribe(res => {
                    console.log(res);
                });
        }
    }

    private promoteProduct(product: Product): void {
        this.modalService.create({
            nzTitle: `Продвинуть ${product.title}`,
            nzContent: PromoSetChooserComponent,
            nzComponentParams: { product },
            nzFooter: null,
        });
    }
}
