import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TrackByFunction,
} from '@angular/core';
import { ExtraActions } from '../product-card/product-card.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GetProductsResponseDto } from '../../../../modules/product/models/product.dto';
import { BookmarksStoreService } from '../../../../modules/bookmarks/bookmarks-store.service';
import { Bookmark } from '../../../../modules/bookmarks/models/bookmark.entity';
import { Product } from '../../../../modules/product/models/product.entity';
import { ProductDataService } from '../../../../modules/product/product-data.service';
import { AdCampaignCurrentDto } from '../../../../modules/ad/models/ad-campaign-current.dto';
import { UserService } from '../../../../modules/user/user.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnChanges, OnInit, OnDestroy {
    @Input() cardActions: ExtraActions[];
    @Input() productsResponse: GetProductsResponseDto | null;
    @Input() adCampaign: AdCampaignCurrentDto;
    @Input() promoProducts: Product[];
    @Input() showPagination = true;
    bookmarks: Bookmark[];
    destroy$ = new Subject();
    isShowBookmarksIcon: boolean;

    constructor(
        private readonly productDataService: ProductDataService,
        private readonly bookmarksStoreService: BookmarksStoreService,
        private readonly cd: ChangeDetectorRef,
        private readonly userService: UserService
    ) {
        this.bookmarksStoreService.loadBookmarks();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.userService
            .getCurrentUser()
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
                this.isShowBookmarksIcon = !!user;
                this.cd.detectChanges();
            });

        if (changes.productsResponse?.currentValue) {
            this.updateProductsWithBookmarks();
            this.cd.detectChanges();
        }
    }

    ngOnInit(): void {
        this.bookmarksStoreService.bookmarks$.pipe(takeUntil(this.destroy$)).subscribe(bookmarks => {
            this.bookmarks = bookmarks;
            this.updateProductsWithBookmarks();
            this.cd.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    trackByFn: TrackByFunction<Product> = (index: number, item: Product) => item.id;

    changePage(page: number) {
        this.productDataService.changePage(page);
    }

    addBookmarkEvent(productId: string) {
        this.bookmarksStoreService.createBookmark(productId);
    }

    removeBookmarkEvent(productId: string) {
        this.bookmarksStoreService.deleteBookmark(productId);
    }

    private updateProductsWithBookmarks(): void {
        if (this.bookmarks && this.productsResponse) {
            this.productsResponse?.products.forEach(product => {
                const bookmarkProduct = this.bookmarks.find(bookmark => bookmark.product.id === product.id);
                product.isBookmark = !!bookmarkProduct;
            });
        }
        this.cd.detectChanges();
    }
}
