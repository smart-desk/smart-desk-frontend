import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, pairwise, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../../../../../models/advert/advert.dto';
import { Filters } from '../../../../../dynamic-fields/models/filter';
import { Category } from '../../../../../../models/category/category.entity';
import { Model } from '../../../../../../models/model/model.entity';
import { AdvertDataService, CategoryService, ModelService } from '../../../../../../services';

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
    options: GetAdvertsDto;
    private destroy$ = new Subject();

    constructor(
        private categoryService: CategoryService,
        private advertDataService: AdvertDataService,
        private modelService: ModelService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter((event: RouterEvent) => event instanceof NavigationEnd),
                pairwise(),
                filter((events: RouterEvent[]) => events[0].url !== events[1].url),
                startWith('Initial call'),
                takeUntil(this.destroy$),
                switchMap(() => this.route.paramMap),
                switchMap((paramMap: ParamMap) => {
                    const categoryId = paramMap.get('category_id') || '';
                    this.options = this.advertDataService.parseQueryParams(this.route.snapshot.queryParamMap);
                    this.advertDataService.loadAdverts(categoryId, this.options);
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
            this.advertsResponse = res;
            this.cd.detectChanges();
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
