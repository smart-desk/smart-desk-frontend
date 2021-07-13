import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetProductsDto, GetProductsResponseDto } from '../../../../modules/product/models/product.dto';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import * as dayjs from 'dayjs';
import { ProductService } from '../../../../modules/product/product.service';
import { ProductStatusEnum } from '../../../../modules/advert/models/product-status.enum';

@Component({
    selector: 'app-products-pending',
    templateUrl: './products-pending.component.html',
    styleUrls: ['./products-pending.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPendingComponent implements OnInit {
    productResponse: GetProductsResponseDto;
    selectedItems = new Set<string>();
    status: ProductStatusEnum;
    productStatus = ProductStatusEnum;

    constructor(private productService: ProductService, private router: Router, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getProducts();
    }

    changePage(page: number): void {
        if (page !== this.productResponse.page) {
            const options = new GetProductsDto();
            options.page = page;
            this.getProducts(options);
        }
    }

    bulkAction(action: 'delete' | 'publish' | 'block'): void {
        let requests = [];
        switch (action) {
            case 'delete':
                requests = [...this.selectedItems.values()].map(id => this.productService.deleteProduct(id));
                break;
            case 'publish':
                requests = [...this.selectedItems.values()].map(id => this.productService.publishProduct(id));
                break;
            case 'block':
                requests = [...this.selectedItems.values()].map(id => this.productService.blockProduct(id));
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
            this.productResponse.products = this.productResponse.products.filter(product => product.id !== id);
            this.cd.detectChanges();
        });
    }

    publish(id: string): void {
        this.productService.publishProduct(id).subscribe(() => {
            this.productResponse.products = this.productResponse.products.filter(product => product.id !== id);
            this.cd.detectChanges();
        });
    }

    block(id: string): void {
        this.productService.blockProduct(id).subscribe(() => {
            this.productResponse.products = this.productResponse.products.filter(product => product.id !== id);
            this.cd.detectChanges();
        });
    }

    updateSelectedItems(id: string, checked: boolean): void {
        if (checked) {
            this.selectedItems.add(id);
        } else {
            this.selectedItems.delete(id);
        }
    }

    formatDate(date: Date | string): string {
        return dayjs(date).format('DD MMM YYYY HH:mm');
    }

    changeStatus(): void {
        if (this.status) {
            this.router.navigate([`./admin/advert/${this.status}`]);
        } else {
            this.router.navigate([`./admin/advert`]);
        }
    }

    private getProducts(options?: GetProductsDto): void {
        this.productService.getPending(options).subscribe(res => {
            this.productResponse = res;
            this.cd.detectChanges();
        });
    }
}
