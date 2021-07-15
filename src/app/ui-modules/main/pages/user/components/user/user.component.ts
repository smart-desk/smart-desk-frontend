import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductsDto, GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { BookmarksStoreService } from '../../../../../../modules/bookmarks/bookmarks-store.service';
import { User } from '../../../../../../modules/user/models/user.entity';
import { UserService } from '../../../../../../modules/user/user.service';
import { ProductService } from '../../../../../../modules/product/product.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
    user: User;
    productResponse: GetProductsResponseDto;
    completedProducts: GetProductsResponseDto;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private productService: ProductService,
        private cdr: ChangeDetectorRef,
        private bookmarkStoreService: BookmarksStoreService
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.has('id')) {
            const userId = this.route.snapshot.paramMap.get('id') || '';
            this.userService.getUser(userId).subscribe(res => {
                this.user = res;
                this.cdr.detectChanges();
            });

            const options = new GetProductsDto();
            options.user = userId;
        }
    }

    createBookmark(productId: string) {
        this.bookmarkStoreService.createBookmark(productId);
    }

    deleteBookmark(productId: string) {
        this.bookmarkStoreService.deleteBookmark(productId);
    }
}
