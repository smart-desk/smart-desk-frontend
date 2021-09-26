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
import { cloneDeep } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GetProductsResponseDto } from '../../../../modules/product/models/product.dto';
import { BookmarksStoreService } from '../../../../modules/bookmarks/bookmarks-store.service';
import { Bookmark } from '../../../../modules/bookmarks/models/bookmark.entity';
import { Product } from '../../../../modules/product/models/product.entity';
import { ProductDataService } from '../../../../modules/product/product-data.service';
import { AdCampaignCurrentDto } from '../../../../modules/ad/models/ad-campaign-current.dto';

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
    destroy$ = new Subject();

    constructor(
        private productDataService: ProductDataService,
        private bookmarksStoreService: BookmarksStoreService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.productsResponse?.currentValue) {
            this.productsResponse = this.updateProductsWithBookmarks(changes.productsResponse?.currentValue);
            this.cd.detectChanges();
            this.bookmarksStoreService.loadBookmarks();
        }
    }

    ngOnInit(): void {
        this.bookmarksStoreService.bookmarks$.pipe(takeUntil(this.destroy$)).subscribe(bookmarks => {
            if (this.productsResponse) {
                this.productsResponse = this.updateProductsWithBookmarks(this.productsResponse, bookmarks);
                this.cd.detectChanges();
            }
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

    private updateProductsWithBookmarks(productsResponse: GetProductsResponseDto, bookmarks?: Bookmark[]): GetProductsResponseDto {
        if (bookmarks) {
            productsResponse.products.forEach(product => {
                const bookmarkProduct = bookmarks.find(bookmark => bookmark.product.id === product.id);
                product.isBookmark = !!bookmarkProduct;
            });
        }
        return cloneDeep(productsResponse);
    }
}
