import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, of, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { Category } from '../../../../modules/category/models/category.entity';
import { LoginService } from '../../../../modules/login/login.service';
import { User } from '../../../../modules/user/models/user.entity';
import { transformCategoryArrayToNZCascade } from '../../../../utils';
import { ProductDataService } from '../../../../modules/product/product-data.service';
import { CategoryService } from '../../../../modules/category/category.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentCategory: Category | null;
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    selectedCategoriesIds: string[] = [];
    searchPhrase = '';
    isHeaderSticky = false;

    private destroy$ = new Subject();
    private user: User | undefined;

    constructor(
        private cd: ChangeDetectorRef,
        private productDataService: ProductDataService,
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.queryParamMap.has('search')) {
            this.searchPhrase = this.route.snapshot.queryParamMap.get('search') || '';
            this.cd.detectChanges();
        }

        this.router.events
            .pipe(
                startWith(new NavigationEnd(0, '', '')),
                takeUntil(this.destroy$),
                filter(event => event instanceof NavigationEnd),
                switchMap(() => (this.route.firstChild && this.route.firstChild.paramMap) || of(new Map())),
                switchMap(paramMap => {
                    if (paramMap.has('category_id')) {
                        return this.categoryService.getCategory(paramMap.get('category_id'));
                    } else {
                        this.currentCategory = null;
                    }
                    return EMPTY;
                })
            )
            .subscribe(category => {
                this.currentCategory = category;
                this.cd.detectChanges();
            });

        this.categoryService
            .getCategories()
            .pipe(map(categories => transformCategoryArrayToNZCascade(categories)))
            .subscribe(tree => {
                this.categoryTree$.next(tree);
            });

        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => (this.user = user));
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onCategorySelect($event: string[]): void {
        const selectedCat = $event[$event.length - 1];
        if (this.currentCategory && this.currentCategory.id === selectedCat) {
            return;
        }

        this.searchPhrase = '';
        this.router.navigate([`category/${selectedCat}`]);
    }

    search(searchPhrase: string): void {
        if (searchPhrase.trim() || searchPhrase === '') {
            if (this.currentCategory) {
                return this.productDataService.search(searchPhrase.trim());
            }
            return this.navigateToGlobalSearchPage(searchPhrase.trim());
        }
    }

    getSearchPlaceholder(): string {
        if (this.currentCategory) {
            return 'Поиск по категории ' + this.currentCategory.name;
        }
        return 'Поиск по объявлениям';
    }

    navigateToProductCreate(): void {
        this.user ? this.router.navigate(['/products/create']) : this.loginService.openLoginModal();
    }

    navigateToMain(): void {
        this.router.navigate(['/']);
    }

    onHeaderSticky(isSticky: boolean) {
        this.isHeaderSticky = isSticky;
        this.cd.detectChanges();
    }

    private navigateToGlobalSearchPage(searchPhrase: string) {
        this.router.navigate(['/', 'search'], { queryParams: { search: searchPhrase } });
    }
}
