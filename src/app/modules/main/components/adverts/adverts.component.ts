import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GetAdvertsResponseDto } from '../../../../shared/models/advert/advert.dto';
import { ExtraActions } from '../advert-card/advert-card.component';
import { Bookmark } from '../../../../shared/models/bookmarks/bookmark.entity';
import { cloneDeep } from 'lodash';
import { AdvertDataService } from '../../../../shared/services';
import { BookmarksStoreService } from '../../../../shared/services/bookmarks/bookmarks-store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-adverts',
    templateUrl: './adverts.component.html',
    styleUrls: ['./adverts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsComponent implements OnChanges, OnInit, OnDestroy {
    @Input() cardActions: ExtraActions[];
    @Input() advertsResponse: GetAdvertsResponseDto;
    destroy$ = new Subject();

    constructor(
        private advertDataService: AdvertDataService,
        private bookmarksStoreService: BookmarksStoreService,
        private cd: ChangeDetectorRef
    ) {}
    ngOnChanges(changes: SimpleChanges) {
        if (changes.advertsResponse?.currentValue) {
            this.updateAdvertsWithBookmarks(changes.advertResponse?.currentValue);
        }
    }
    ngOnInit(): void {
        this.bookmarksStoreService.bookmarks$.pipe(takeUntil(this.destroy$)).subscribe(bookmarks => {
            this.advertsResponse = this.updateAdvertsWithBookmarks(this.advertsResponse, bookmarks);
            this.cd.detectChanges();
        });
    }

    ngOnDestroy(): void {
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
