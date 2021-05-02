import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { GetAdvertsResponseDto } from '../../../shared/models/advert/advert.dto';
import { AdvertDataService } from '../../../shared/services';
import { Bookmark } from '../../../shared/models/bookmarks/bookmark.entity';
import { cloneDeep } from 'lodash';
import { BookmarksStoreService } from '../../../shared/services/bookmarks/bookmarks-store.service';

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
    advertsResponse: GetAdvertsResponseDto;
    private destroy$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private advertDataService: AdvertDataService,
        private bookmarksStoreService: BookmarksStoreService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.advertDataService.adverts$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.advertsResponse = this.updateAdvertsWithBookmarks(res, this.bookmarksStoreService.bookmarks$.getValue());
            this.cd.detectChanges();
        });

        this.router.events
            .pipe(
                filter((event: RouterEvent) => event instanceof NavigationEnd),
                pairwise(),
                filter((events: RouterEvent[]) => events[0].url !== events[1].url),
                startWith('Initial call'),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                const options = this.advertDataService.parseQueryParams(this.route.snapshot.queryParamMap);
                this.advertDataService.loadAdverts(null, options);
                this.cd.detectChanges();
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changePage(page: number) {
        this.advertDataService.changePage(page);
    }

    addBookmarkEvent(advertId: string) {
        this.bookmarksStoreService.createBookmark(advertId);
    }

    removeBookmarkEvent(advertId: string) {
        this.bookmarksStoreService.deleteBookmark(advertId);
    }

    private updateAdvertsWithBookmarks(advertsResponse: GetAdvertsResponseDto, bookmarks?: Bookmark[]): GetAdvertsResponseDto {
        if (!advertsResponse) {
            return;
        }
        if (bookmarks) {
            advertsResponse.adverts.forEach(advert => {
                const bookmarkAdvert = bookmarks.find(bookmark => bookmark.advert.id === advert.id);
                advert.isBookmark = !!bookmarkAdvert;
            });
        }
        return cloneDeep(advertsResponse);
    }
}
