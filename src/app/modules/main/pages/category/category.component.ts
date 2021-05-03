import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AdvertDataService, CategoryService, ModelService } from '../../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { GetAdvertsResponseDto } from '../../../../shared/models/advert/advert.dto';
import { Category } from '../../../../shared/models/category/category.entity';
import { Model } from '../../../../shared/models/model/model.entity';
import { Filters } from '../../../../shared/modules/dynamic-fields/models/filter';
import { BookmarksStoreService } from '../../../../shared/services/bookmarks/bookmarks-store.service';

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
        this.advertDataService.adverts$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.advertsResponse = res;
        });
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
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
