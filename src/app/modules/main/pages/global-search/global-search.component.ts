import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../../../shared/models/advert/advert.dto';
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

        const options = this.parseQueryParams(this.route.snapshot.queryParamMap);
        this.filters = options.filters;

        this.advertDataService.loadAdverts(null, options);
        this.cd.detectChanges();
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

    private parseQueryParams(queryParams: ParamMap): GetAdvertsDto {
        const resultParams = new GetAdvertsDto();

        if (queryParams.has('page')) {
            try {
                resultParams.page = parseInt(queryParams.get('page'), 10);
            } catch (e) {}
        }

        if (queryParams.has('limit')) {
            try {
                resultParams.limit = parseInt(queryParams.get('limit'), 10);
            } catch (e) {}
        }

        if (queryParams.has('search')) {
            resultParams.search = queryParams.get('search');
        }

        if (queryParams.has('filters')) {
            try {
                resultParams.filters = JSON.parse(queryParams.get('filters'));
            } catch (e) {}
        }
        return resultParams;
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
