import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { AdvertDataService, CategoryService } from '../../../../shared/services';
import { Category } from '../../../../shared/models/category/category.entity';
import { LoginService } from '../../../../shared/services/login/login.service';
import { User } from '../../../../shared/models/user/user.entity';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentCategory: Category;
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    selectedCategoriesIds: string[] = [];
    searchPhrase = '';
    private destroy$ = new Subject();
    private user: User;

    constructor(
        private cd: ChangeDetectorRef,
        private advertDataService: AdvertDataService,
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.queryParamMap.has('search')) {
            this.searchPhrase = this.route.snapshot.queryParamMap.get('search');
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
                    }
                    return of(null);
                })
            )
            .subscribe(category => {
                this.currentCategory = category;
                this.cd.detectChanges();
            });

        this.categoryService
            .getCategories()
            .pipe(map(categories => this.categoryService.transformArrayToTree(categories)))
            .subscribe(tree => {
                this.categoryTree$.next(tree);
            });

        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => (this.user = user));
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onCategorySelect($event): void {
        const selectedCat = $event[$event.length - 1];
        if (this.currentCategory && this.currentCategory.id === selectedCat) {
            return;
        }

        this.searchPhrase = '';
        this.router.navigate([`/${selectedCat}`]);
    }

    search(event: { searchPhrase: string; globalSearch: boolean }): void {
        if (event.searchPhrase.trim() || event.searchPhrase === '') {
            if (!event.globalSearch) {
                return this.advertDataService.search(event.searchPhrase.trim());
            }
            if (event.globalSearch) {
                return this.advertDataService.globalSearch(event.searchPhrase.trim());
            }
        }
    }

    getSearchPlaceholder(): string {
        if (this.currentCategory) {
            return 'Поиск по категории ' + this.currentCategory.name;
        }
        return 'Поиск по объявлениям';
    }

    navigateToAdvertCreate(): void {
        this.user ? this.router.navigate(['/adverts/create']) : this.loginService.openLoginModal();
    }

    navigateToMain(): void {
        this.selectedCategoriesIds = [];
        this.router.navigate(['/']);
    }
}
