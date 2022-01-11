import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetProductsDto, GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { ProductService } from '../../../../../../modules/product/product.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
    recentProducts: GetProductsResponseDto;

    constructor(private cd: ChangeDetectorRef, private productService: ProductService) {}

    ngOnInit() {
        const options = new GetProductsDto();
        options.limit = 8;
        this.productService.getProducts(options).subscribe(res => {
            this.recentProducts = res;
            this.cd.detectChanges();
        });
    }
}
