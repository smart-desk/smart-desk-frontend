import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { User } from '../../../../../../modules/user/models/user.entity';
import { ExtraActions } from '../../../../components/product-card/product-card.component';
import { Product } from '../../../../../../modules/product/models/product.entity';
import { Router } from '@angular/router';
import { ProductService } from '../../../../../../modules/product/product.service';
import { UserService } from '../../../../../../modules/user/user.service';
import { StripeService } from '../../../../../../modules/stripe/stripe.service';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PromoSetChooserComponent } from '../../../../components/promo-set-chooser/promo-set-chooser.component';

@Component({
    selector: 'app-my-products',
    templateUrl: './my-products.component.html',
    styleUrls: ['./my-products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyProductsComponent implements OnInit {
    activeProductsResponse: GetProductsResponseDto;
    blockedProductsResponse: GetProductsResponseDto;
    pendingProductsResponse: GetProductsResponseDto;
    completedProductsResponse: GetProductsResponseDto;
    user: User;

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
            this.cdr.detectChanges();
        });
        this.getProducts();
    }

    getProducts(): void {
        this.getActiveProducts();
        this.getPendingProducts();
        this.getBlockedProducts();
        this.getCompletedProducts();
    }

    private getActiveProducts(): void {
        this.productService.getMyProducts().subscribe(res => {
            this.activeProductsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private getPendingProducts(): void {
        this.productService.getPending().subscribe(res => {
            this.pendingProductsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private getBlockedProducts(): void {
        this.productService.getBlocked().subscribe(res => {
            this.blockedProductsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private getCompletedProducts(): void {
        this.productService.getCompleted().subscribe(res => {
            this.completedProductsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private completeProduct(product: Product): void {
        this.productService.completeProduct(product.id).subscribe(() => {
            this.getProducts();
        });
    }

    private editProduct(product: Product): void {
        this.router.navigate(['products', product.id, 'edit']);
    }

    private deleteProduct(product: Product): void {
        this.productService.deleteProduct(product.id).subscribe(() => {
            this.getProducts();
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
