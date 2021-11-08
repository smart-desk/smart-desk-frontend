import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterEvent } from '@angular/router';
import { of, Subject } from 'rxjs';
import { filter, pairwise, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { GetProductsDto, GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { Category } from '../../../../../../modules/category/models/category.entity';
import { Model } from '../../../../../../modules/model/models/model.entity';
import { CategoryService } from '../../../../../../modules/category/category.service';
import { ProductDataService } from '../../../../../../modules/product/product-data.service';
import { ModelService } from '../../../../../../modules/model/model.service';
import { AdCampaignType } from '../../../../../../modules/ad/models/ad-campaign.entity';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { AdCampaignCurrentDto } from '../../../../../../modules/ad/models/ad-campaign-current.dto';
import { Product } from '../../../../../../modules/product/models/product.entity';
import { PromoService } from '../../../../../../modules/promo/promo.service';
import { BreadcrumbStep } from '../../../../components/breadcrumb/breadcrumbs.component';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
    loading = false;
    productsResponse: GetProductsResponseDto;
    sidebarAdCampaign: AdCampaignCurrentDto;
    mainAdCampaign: AdCampaignCurrentDto;
    model: Model;
    category: Category;
    options: GetProductsDto;
    promoProducts: Product[];
    breadcrumbs: BreadcrumbStep[];
    private destroy$ = new Subject();
    constructor(
        private promoService: PromoService,
        private categoryService: CategoryService,
        private productDataService: ProductDataService,
        private modelService: ModelService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private adService: AdService
    ) {}

    ngOnInit(): void {
        this.productDataService.events$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            this.loading = true;
            this.cd.detectChanges();
        });

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
                    this.getPromoProducts(categoryId);
                    this.options = this.productDataService.getProductOptionsFromQuery(this.route.snapshot.queryParamMap);
                    this.productDataService.loadProducts(categoryId, this.options);
                    this.formBreadcrumbs(categoryId);
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
            this.loading = false;
            this.cd.detectChanges();
        });

        this.adService.getAdCampaignsCurrent(AdCampaignType.SIDEBAR).subscribe(campaign => {
            this.sidebarAdCampaign = campaign;
            this.cd.detectChanges();
        });

        this.adService.getAdCampaignsCurrent(AdCampaignType.MAIN).subscribe(campaign => {
            this.mainAdCampaign = campaign;
            this.cd.detectChanges();
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    dropFilters(): void {
        this.productDataService.dropFilters();
    }

    isEmptyObject(obj: object): boolean {
        return isEmpty(obj);
    }

    private getPromoProducts(categoryId: string): void {
        this.promoService.getPromoProducts(categoryId).subscribe(res => {
            this.promoProducts = res;
            this.cd.detectChanges();
        });
    }

    private formBreadcrumbs(id: string): void {
        let parentCat: Category;
        let childCat: Category;
        this.categoryService
            .getCategory(id)
            .pipe(
                tap(cat => {
                    childCat = cat;
                }),
                switchMap(cat => {
                    if (cat.parentId) {
                        return this.categoryService.getCategory(cat.parentId);
                    }
                    return of(null);
                })
            )
            .subscribe(cat => {
                if (cat) {
                    parentCat = cat;
                }

                this.breadcrumbs = [{ name: 'Главная', navigateUrl: ['/'] }];
                [parentCat, childCat].forEach(step => {
                    if (step) {
                        this.breadcrumbs.push({ name: step.name, navigateUrl: ['/', 'category', step.id] });
                    }
                });
                this.breadcrumbs = [...this.breadcrumbs];
                this.cd.detectChanges();
            });
    }
}
