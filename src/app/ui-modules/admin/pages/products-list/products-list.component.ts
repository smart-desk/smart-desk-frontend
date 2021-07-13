import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { zip } from 'rxjs';
import { Category } from '../../../../modules/category/models/category.entity';
import { GetProductsDto, GetProductsResponseDto } from '../../../../modules/product/models/product.dto';
import { ProductService } from '../../../../modules/product/product.service';
import { CategoryService } from '../../../../modules/category/category.service';

@Component({
    selector: 'app-table-products',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    productResponse: GetProductsResponseDto;
    selectedItems = new Set<string>();
    categories: Category[] = [];

    constructor(
        private productService: ProductService,
        private router: Router,
        private categoryService: CategoryService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getProducts();
        this.categoryService.getCategories().subscribe(categories => (this.categories = categories));
    }

    bulkAction(action: 'delete' | 'block'): void {
        let requests = [];
        switch (action) {
            case 'delete':
                requests = [...this.selectedItems.values()].map(id => this.productService.deleteProduct(id));
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

    edit(id: string): void {
        this.router.navigate([`/products/${id}/edit`]);
    }

    delete(id: string): void {
        this.productService.deleteProduct(id).subscribe(() => {
            this.productResponse.products = this.productResponse.products.filter(item => item.id !== id);
            this.cd.detectChanges();
        });
    }

    block(id: string): void {
        this.productService.blockProduct(id).subscribe(() => {
            this.productResponse.products = this.productResponse.products.filter(item => item.id !== id);
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

    changePage(page: number): void {
        if (page !== this.productResponse.page) {
            const options = new GetProductsDto();
            options.page = page;
            this.getProducts(options);
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

    private getProducts(options?: GetProductsDto): void {
        this.productService.getProducts(options).subscribe(res => {
            this.productResponse = res;
            this.cd.detectChanges();
        });
    }
}
