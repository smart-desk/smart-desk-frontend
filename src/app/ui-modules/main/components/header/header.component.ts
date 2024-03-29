import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Category } from '../../../../modules/category/models/category.entity';
import { LoginService } from '../../../../modules/login/login.service';
import { User } from '../../../../modules/user/models/user.entity';
import { ProductDataService } from '../../../../modules/product/product-data.service';
import { CategoryStoreService } from '../../../../modules/category/category-store.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input()
    logo: string;

    categories$: Observable<Category[]>;
    currentCategory: Category | undefined;
    searchPhrase = '';
    isHeaderSticky = false;
    isMenuOpen = false;

    @ViewChild('categoryMenu')
    menuElement: ElementRef;

    @ViewChild('categoryButton', { read: ElementRef })
    buttonElement: ElementRef;

    private destroy$ = new Subject();
    private user: User | undefined;
    constructor(
        private cd: ChangeDetectorRef,
        private productDataService: ProductDataService,
        private categoryStoreService: CategoryStoreService,
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService
    ) {}

    @HostListener('document:click', ['$event'])
    clickOutsideCategoryMenu(event: MouseEvent) {
        if (!this.menuElement?.nativeElement?.contains(event.target) && !this.buttonElement?.nativeElement?.contains(event.target)) {
            this.isMenuOpen = false;
            this.cd.detectChanges();
        }
    }

    @HostListener('window:keydown', ['$event'])
    hideMenu(event: KeyboardEvent) {
        if (event.key === 'Escape' && this.isMenuOpen) {
            this.isMenuOpen = false;
            this.cd.detectChanges();
        }
    }

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
                switchMap(paramMap =>
                    paramMap.has('category_id') ? this.categoryStoreService.getCategory(paramMap.get('category_id')) : of(undefined)
                )
            )
            .subscribe(category => {
                this.currentCategory = category;
                this.cd.detectChanges();
            });

        this.categories$ = this.categoryStoreService.categories$;
        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => (this.user = user));
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onCategorySelect(id: string): void {
        this.isMenuOpen = false;
        if (this.currentCategory && this.currentCategory.id === id) {
            return;
        }

        this.searchPhrase = '';
        this.router.navigate([`category/${id}`]);
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

    onHeaderSticky(isSticky: boolean) {
        this.isHeaderSticky = isSticky;
        this.cd.detectChanges();
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.cd.detectChanges();
    }

    private navigateToGlobalSearchPage(searchPhrase: string) {
        this.router.navigate(['/', 'search'], { queryParams: { search: searchPhrase } });
    }
}
