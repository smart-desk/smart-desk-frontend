import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TrackByFunction,
    ViewChild,
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
import { LoginService } from '../../../../modules/login/login.service';

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
    @Input() loading = false;

    bookmarks: Bookmark[];
    destroy$ = new Subject();
    showBookmarksIcon: boolean;

    constructor(
        private readonly productDataService: ProductDataService,
        private readonly bookmarksStoreService: BookmarksStoreService,
        private readonly cd: ChangeDetectorRef,
        private readonly loginService: LoginService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes.productsResponse?.currentValue !== changes.productsResponse?.previousValue ||
            changes.promoProducts?.currentValue !== changes.promoProducts?.previousValue
        ) {
            this.updateProductsWithBookmarks();
        }
    }

    ngOnInit(): void {
        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            if (user) {
                this.showBookmarksIcon = true;
                this.bookmarksStoreService.loadBookmarks();
            } else {
                this.showBookmarksIcon = false;
            }
            this.cd.detectChanges();
        });

        this.bookmarksStoreService.bookmarks$.pipe(takeUntil(this.destroy$)).subscribe(bookmarks => {
            this.bookmarks = bookmarks;
            this.updateProductsWithBookmarks();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    trackByFn: TrackByFunction<Product> = (index: number, item: Product) => item.id + item.isBookmark;

    changePage(page: number): void {
        window.scrollTo(window.pageXOffset, 0);
        this.productDataService.changePage(page);
    }

    addBookmarkEvent(productId: string): void {
        this.bookmarksStoreService.createBookmark(productId);
    }

    removeBookmarkEvent(productId: string): void {
        this.bookmarksStoreService.deleteBookmark(productId);
    }

    private updateProductsWithBookmarks(): void {
        if (this.bookmarks && this.productsResponse) {
            this.productsResponse?.products.forEach(product => {
                const bookmarkProduct = this.bookmarks.find(bookmark => bookmark.product.id === product.id);
                product.isBookmark = !!bookmarkProduct;
            });
        }

        if (this.bookmarks && this.promoProducts) {
            this.promoProducts?.forEach(product => {
                const bookmarkProduct = this.bookmarks.find(bookmark => bookmark.product.id === product.id);
                product.isBookmark = !!bookmarkProduct;
            });
        }

        this.cd.markForCheck();
    }
}
