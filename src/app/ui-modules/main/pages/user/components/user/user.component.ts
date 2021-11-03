import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductsDto, GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { User } from '../../../../../../modules/user/models/user.entity';
import { UserService } from '../../../../../../modules/user/user.service';
import { ProductService } from '../../../../../../modules/product/product.service';
import { ProductStatus } from '../../../../../../modules/product/models/product-status.enum';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
    loading = false;
    user: User;
    productResponse: GetProductsResponseDto;
    completedProducts: GetProductsResponseDto;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly productService: ProductService,
        private readonly cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.has('id')) {
            const userId = this.route.snapshot.paramMap.get('id') || '';
            this.userService
                .getUser(userId)
                .pipe(take(1))
                .subscribe(res => {
                    this.user = res;
                    this.cdr.detectChanges();
                });

            this.loading = true;
            this.cdr.markForCheck();

            const activeProductOptions = new GetProductsDto();
            activeProductOptions.user = userId;
            activeProductOptions.status = ProductStatus.ACTIVE;
            const completedProductOptions = new GetProductsDto();
            completedProductOptions.user = userId;
            completedProductOptions.status = ProductStatus.COMPLETED;

            forkJoin([
                this.productService.getProducts(activeProductOptions),
                this.productService.getProducts(completedProductOptions),
            ]).subscribe(([activeProduct, completedProduct]) => {
                this.loading = false;
                this.productResponse = activeProduct;
                this.completedProducts = completedProduct;
                this.cdr.detectChanges();
            });
        }
    }
}
