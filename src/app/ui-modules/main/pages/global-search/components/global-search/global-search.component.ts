import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { BookmarksStoreService } from '../../../../../../modules/bookmarks/bookmarks-store.service';
import { ProductDataService } from '../../../../../../modules/product/product-data.service';

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
    productsResponse: GetProductsResponseDto;
    private destroy$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private productDataService: ProductDataService,
        private bookmarksStoreService: BookmarksStoreService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter((event: RouterEvent) => event instanceof NavigationEnd),
                pairwise(),
                filter((events: RouterEvent[]) => events[0].url !== events[1].url),
                startWith('Initial call'),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                const options = this.productDataService.parseQueryParams(this.route.snapshot.queryParamMap);
                this.productDataService.loadProducts(null, options);
                this.cd.detectChanges();
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
