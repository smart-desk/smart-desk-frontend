import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GetProductsDto, GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { User } from '../../../../../../modules/user/models/user.entity';
import { ExtraActions } from '../../../../components/product-card/product-card.component';
import { Product } from '../../../../../../modules/product/models/product.entity';
import { Router } from '@angular/router';
import { ProductService } from '../../../../../../modules/product/product.service';
import { UserService } from '../../../../../../modules/user/user.service';
import { StripeService } from '../../../../../../modules/stripe/stripe.service';
import { from, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PromoSetChooserComponent } from '../../../../components/promo-set-chooser/promo-set-chooser.component';
import { ProductStatus } from '../../../../../../modules/product/models/product-status.enum';

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
    productStatus = ProductStatus;
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

    constructor(
        private productService: ProductService,
        private cdr: ChangeDetectorRef,
        private userService: UserService,
        private router: Router,
        private stripeService: StripeService,
        private modalService: NzModalService
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.getProducts(ProductStatus.ACTIVE);
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getProducts(status: ProductStatus): void {
        this.setRouterParam(status);
        this.loading = true;
        this.cdr.markForCheck();

        const options = new GetProductsDto();
        options.user = this.user?.id;
        options.status = status;

        this.productService.getProducts(options).subscribe(res => {
            this.productResponse = res;
            this.loading = false;
            this.cdr.detectChanges();
        });
    }

    private setRouterParam(status: ProductStatus): void {
        this.router.navigate([], { queryParams: { status } });
    }

    private completeProduct(product: Product): void {
        this.productService.completeProduct(product.id).subscribe(() => {
            this.getProducts(this.status);
        });
    }

    private editProduct(product: Product): void {
        this.router.navigate(['products', product.id, 'edit']);
    }

    private deleteProduct(product: Product): void {
        this.productService.deleteProduct(product.id).subscribe(() => {
            this.getProducts(this.status);
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
