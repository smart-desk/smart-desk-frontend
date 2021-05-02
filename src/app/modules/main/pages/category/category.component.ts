import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AdvertDataService, CategoryService, ModelService } from '../../../../services';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { GetAdvertsResponseDto } from '../../../../models/advert/advert.dto';
import { Category } from '../../../../models/category/category.entity';
import { Model } from '../../../../models/model/model.entity';
import { Filters } from '../../../dynamic-fields/models/filter';
import { Bookmark } from '../../../../models/bookmarks/bookmark.entity';
import { cloneDeep } from 'lodash';
import { BookmarksStoreService } from '../../../../services/bookmarks/bookmarks-store.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
    advertsResponse: GetAdvertsResponseDto;
    model: Model;
    category: Category;
    filters: Filters;
    private destroy$ = new Subject();

    constructor(
        private categoryService: CategoryService,
        private advertDataService: AdvertDataService,
        private modelService: ModelService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private bookmarksStoreService: BookmarksStoreService
    ) {}

    ngOnInit(): void {
        this.bookmarksStoreService.loadBookmarks();

        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap(paramMap => {
                    const categoryId = paramMap.get('category_id');
                    const options = this.advertDataService.parseQueryParams(this.route.snapshot.queryParamMap);
                    this.filters = options.filters;

                    this.advertDataService.loadAdverts(categoryId, options);
                    return this.categoryService.getCategory(categoryId);
                }),
                switchMap(category => {
                    this.category = category;
                    return this.modelService.getModel(this.category.modelId);
                })
            )
            .subscribe(model => {
                this.model = model;
                this.cd.detectChanges();
            });

        this.bookmarksStoreService.bookmarks$.pipe(takeUntil(this.destroy$)).subscribe(bookmarks => {
            this.advertsResponse = this.updateAdvertsWithBookmarks(this.advertsResponse, bookmarks);
            this.cd.detectChanges();
        });

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
