import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, pairwise, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { GetProductsDto, GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { Category } from '../../../../../../modules/category/models/category.entity';
import { Model } from '../../../../../../modules/model/models/model.entity';
import { CategoryService } from '../../../../../../modules/category/category.service';
import { ProductDataService } from '../../../../../../modules/product/product-data.service';
import { ModelService } from '../../../../../../modules/model/model.service';
import { AdCampaignEntity, AdCampaignType } from '../../../../../../modules/ad/models/ad-campaign.entity';
import { AdService } from '../../../../../../modules/ad/ad.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
    productsResponse: GetProductsResponseDto;
    adCards: AdCampaignEntity[];
    model: Model;
    category: Category;
    options: GetProductsDto;
    private destroy$ = new Subject();
    constructor(
        private categoryService: CategoryService,
        private productDataService: ProductDataService,
        private modelService: ModelService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private adService: AdService
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
                    this.options = this.productDataService.parseQueryParams(this.route.snapshot.queryParamMap);
                    this.productDataService.loadProducts(categoryId, this.options);
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

        this.productDataService.products$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.productsResponse = res;
            this.cd.detectChanges();
        });

        this.adService.getAdCampaignsCurrent(AdCampaignType.MAIN).subscribe(cards => {
            console.log('cards', cards);
            this.adCards = cards;
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
