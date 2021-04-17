import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { GetAdvertsResponseDto } from '../../../../shared/models/advert/advert.dto';
import { Filters } from '../../../../shared/modules/dynamic-fields/models/filter';
import { AdvertDataService } from '../../../../shared/services';
import { Bookmark } from '../../../../shared/models/bookmarks/bookmark.entity';
import { cloneDeep } from 'lodash';
import { BookmarksStoreService } from '../../../../shared/services/bookmarks/bookmarks-store.service';
import { Model } from '../../../../shared/models/model/model.entity';

@Component({
    selector: 'app-app-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
    filters: Filters;
    advertsResponse: GetAdvertsResponseDto;
    // TODO: предусмотреть общую модель данных
    model: Model;
    private destroy$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private advertDataService: AdvertDataService,
        private bookmarksStoreService: BookmarksStoreService
    ) {}

    ngOnInit(): void {
        this.advertDataService.adverts$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.advertsResponse = this.updateAdvertsWithBookmarks(res, this.bookmarksStoreService.bookmarks$.getValue());
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
