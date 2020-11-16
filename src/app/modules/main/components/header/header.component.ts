import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { NzCascaderOption } from 'ng-zorro-antd';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { AdvertDataService, CategoryService } from '../../../../shared/services';
import { Category } from '../../../../shared/models/dto/category.entity';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [AdvertDataService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentCategory: Category;
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    selectedCategoriesIds: string[] = [];

    searchPhrase = '';

    private destroy$ = new Subject();

    constructor(
        private cd: ChangeDetectorRef,
        private advertDataService: AdvertDataService,
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.queryParamMap.has('search')) {
            this.searchPhrase = this.route.snapshot.queryParamMap.get('search');
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
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onCategorySelect($event): void {
        const selectedCat = $event[$event.length - 1];
        this.searchPhrase = '';
        this.router.navigate([`/${selectedCat}`]);
    }

    search(searchPhrase: string): void {
        if (searchPhrase.trim()) {
            this.advertDataService.search(searchPhrase.trim());
        }
    }

    getSearchPlaceholder(): string {
        if (this.currentCategory) {
            return 'Поиск по категории ' + this.currentCategory.name;
        }
        return 'Поиск по объявлениям';
    }
}
