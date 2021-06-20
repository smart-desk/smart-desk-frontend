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
import { ExtraActions } from '../advert-card/advert-card.component';
import { cloneDeep } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GetAdvertsResponseDto } from '../../../../modules/advert/models/advert.dto';
import { BookmarksStoreService } from '../../../../modules/bookmarks/bookmarks-store.service';
import { Bookmark } from '../../../../modules/bookmarks/models/bookmark.entity';
import { Advert } from '../../../../modules/advert/models/advert.entity';
import { AdvertDataService } from '../../../../modules';

@Component({
    selector: 'app-adverts',
    templateUrl: './adverts.component.html',
    styleUrls: ['./adverts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsComponent implements OnChanges, OnInit, OnDestroy {
    @Input() cardActions: ExtraActions[];
    @Input() advertsResponse: GetAdvertsResponseDto | null;
    destroy$ = new Subject();

    constructor(
        private advertDataService: AdvertDataService,
        private bookmarksStoreService: BookmarksStoreService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.advertsResponse?.currentValue) {
            this.advertsResponse = this.updateAdvertsWithBookmarks(changes.advertsResponse?.currentValue);
            this.cd.detectChanges();
            this.bookmarksStoreService.loadBookmarks();
        }
    }

    ngOnInit(): void {
        this.bookmarksStoreService.bookmarks$.pipe(takeUntil(this.destroy$)).subscribe(bookmarks => {
            if (this.advertsResponse) {
                this.advertsResponse = this.updateAdvertsWithBookmarks(this.advertsResponse, bookmarks);
                this.cd.detectChanges();
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    trackByFn: TrackByFunction<Advert> = (index: number, item: Advert) => item.id;

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
        if (bookmarks) {
            advertsResponse.adverts.forEach(advert => {
                const bookmarkAdvert = bookmarks.find(bookmark => bookmark.advert.id === advert.id);
                advert.isBookmark = !!bookmarkAdvert;
            });
        }
        return cloneDeep(advertsResponse);
    }
}
