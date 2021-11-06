import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { User } from '../../../../../../modules/user/models/user.entity';
import { UserService } from '../../../../../../modules/user/user.service';
import { ProductStatus } from '../../../../../../modules/product/models/product-status.enum';
import { ProductDataService } from '../../../../../../modules/product/product-data.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
    loading = false;
    user: User;
    productResponse: GetProductsResponseDto;
    status: ProductStatus;
    destroy$ = new Subject();

    tabs = [
        {
            title: 'Активные',
            status: ProductStatus.ACTIVE,
            isActive: (currentStatus: ProductStatus) => currentStatus === ProductStatus.ACTIVE,
        },
        {
            title: 'Завершенные',
            status: ProductStatus.COMPLETED,
            isActive: (currentStatus: ProductStatus) => currentStatus === ProductStatus.COMPLETED,
        },
    ];

    constructor(
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly cdr: ChangeDetectorRef,
        private readonly productDataService: ProductDataService
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

        if (!this.route.snapshot.paramMap.has('id')) {
            return;
        }

        this.userService.getUser(this.route.snapshot.paramMap.get('id') as string).subscribe(user => {
            const options = this.productDataService.getProductOptionsFromQuery(this.route.snapshot.queryParamMap);
            options.user = user.id;

            this.productDataService.loadProducts(null, options);

            this.status = options.status || ProductStatus.ACTIVE;
            this.user = user;

            this.cdr.markForCheck();
        });
    }

    changeStatus(status: ProductStatus): void {
        this.status = status;
        this.cdr.markForCheck();
        this.productDataService.changeStatus(this.status);
    }

    getSelectedTabIndex(): number {
        return this.tabs.findIndex(tab => tab.isActive(this.status));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
