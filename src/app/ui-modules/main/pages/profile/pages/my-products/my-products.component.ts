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
        private stripeService: StripeService
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cdr.detectChanges();
        });
        this.getProducts();
    }

    getProducts() {
        this.getActiveProducts();
        this.getPendingProducts();
        this.getBlockedProducts();
        this.getCompletedProducts();
    }

    private getActiveProducts() {
        this.productService.getMyProducts().subscribe(res => {
            this.activeProductsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private getPendingProducts() {
        this.productService.getPending().subscribe(res => {
            this.pendingProductsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private getBlockedProducts() {
        this.productService.getBlocked().subscribe(res => {
            this.blockedProductsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private getCompletedProducts() {
        this.productService.getCompleted().subscribe(res => {
            this.completedProductsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private completeProduct(product: Product) {
        this.productService.completeProduct(product.id).subscribe(() => {
            this.getProducts();
        });
    }

    private editProduct(product: Product) {
        this.router.navigate(['products', product.id, 'edit']);
    }

    private deleteProduct(product: Product) {
        this.productService.deleteProduct(product.id).subscribe(() => {
            this.getProducts();
        });
    }

    private liftProduct(product: Product) {
        if (this.stripeService.stripe) {
            this.productService
                .liftProduct(product.id)
                .pipe(switchMap(res => from(this.stripeService.stripe.redirectToCheckout({ sessionId: res.id }))))
                .subscribe(res => {
                    console.log(res);
                });
        }
    }
}
