import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AdvertDataService, CategoryService, ModelService } from '../../../../shared/services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../../../shared/models/dto/advert.dto';
import { Category } from '../../../../shared/models/dto/category.entity';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { Model } from '../../../../shared/models/dto/model.entity';
import { Filters } from '../../../../shared/modules/dynamic-fields/models/filter';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
    adverts: Advert[];
    model: Model;
    isLoaded: boolean;
    totalAdverts: number;
    pageSize: number;
    pageIndex: number;
    category: Category;
    filters: Filters;

    private destroy$ = new Subject();

    constructor(
        private categoryService: CategoryService,
        private advertDataService: AdvertDataService,
        private modelService: ModelService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap(paramMap => {
                    const categoryId = paramMap.get('category_id');
                    const options = this.parseQueryParams(this.route.snapshot.queryParamMap);
                    this.filters = options.filters;

                    this.advertDataService.loadAdvertsForCategory(categoryId, options);
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

        this.advertDataService.adverts$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.initAdvertList(res);
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changePage(page: number) {
        this.advertDataService.changePage(page);
    }

    private initAdvertList(res: GetAdvertsResponseDto) {
        this.pageIndex = res.page;
        this.totalAdverts = res.totalCount;
        this.pageSize = res.limit;
        this.adverts = res.adverts;
        this.isLoaded = true;
        this.cd.detectChanges();
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
}
