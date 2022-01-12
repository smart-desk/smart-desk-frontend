import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterEvent } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { filter, pairwise, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { GetProductsDto, GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { Category } from '../../../../../../modules/category/models/category.entity';
import { Model } from '../../../../../../modules/model/models/model.entity';
import { CategoryStoreService } from '../../../../../../modules/category/category-store.service';
import { ProductDataEvents, ProductDataService } from '../../../../../../modules/product/product-data.service';
import { ModelService } from '../../../../../../modules/model/model.service';
import { Product } from '../../../../../../modules/product/models/product.entity';
import { PromoService } from '../../../../../../modules/promo/promo.service';
import { BreadcrumbsStep } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
    loading = false;
    productsResponse: GetProductsResponseDto;
    model: Model;
    category: Category;
    options: GetProductsDto;
    promoProducts: Product[];
    breadcrumbs: BreadcrumbsStep[] = [];
    private destroy$ = new Subject();
    private sortingAndFiltersModal: NzModalRef;

    @ViewChild('sortingAndFilters', { read: TemplateRef })
    private sortingAndFiltersTmp: TemplateRef<any>;

    constructor(
        private promoService: PromoService,
        private categoryStoreService: CategoryStoreService,
        private productDataService: ProductDataService,
        private modelService: ModelService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NzModalService
    ) {}

    ngOnInit(): void {
        this.productDataService.events$.pipe(takeUntil(this.destroy$)).subscribe((event: ProductDataEvents) => {
            if (
                this.sortingAndFiltersModal &&
                (event === ProductDataEvents.APPLY_FILTERS || event === ProductDataEvents.DROP_FILTERS || event === ProductDataEvents.SORT)
            ) {
                this.sortingAndFiltersModal.close();
            }
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

                    return this.categoryStoreService.getCategory(categoryId);
                }),
                switchMap(category => {
                    if (!category) {
                        return EMPTY;
                    }
                    this.category = category;
                    return this.modelService.getModel(this.category.modelId);
                })
            )
            .subscribe(model => {
                this.model = model;
                this.buildBreadcrumbs();
                this.cd.detectChanges();
            });

        this.productDataService.products$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.productsResponse = res;
            this.loading = false;
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

    openFiltersModal(): void {
        this.sortingAndFiltersModal = this.modalService.create<any>({
            nzContent: this.sortingAndFiltersTmp,
            nzClassName: 'category__sorting-and-filters-modal',
            nzFooter: null,
            nzStyle: { top: 0, left: 0, right: 0 },
            nzBodyStyle: { 'padding-top': '56px' },
        });
    }

    getAppliedFiltersLength(): number | undefined {
        return this?.options?.filters?.length;
    }

    private getPromoProducts(categoryId: string): void {
        this.promoService.getPromoProducts(categoryId).subscribe(res => {
            this.promoProducts = res;
            this.cd.detectChanges();
        });
    }

    private buildBreadcrumbs(): void {
        this.breadcrumbs = [];
        this.categoryStoreService.categories$.subscribe(cats => this.addBreadcrumb(this.category, cats));
    }
    private addBreadcrumb(category: Category, cats: Category[]): void {
        const step = { name: category.name, navigateUrl: ['/', 'category', category.id] };
        this.breadcrumbs.unshift(step);
        this.breadcrumbs = [...this.breadcrumbs];
        this.cd.detectChanges();
        if (category.parentId) {
            const parentCat = cats.find(cat => cat.id === category.parentId);
            if (parentCat) {
                this.addBreadcrumb(parentCat, cats);
            }
        }
    }
}
