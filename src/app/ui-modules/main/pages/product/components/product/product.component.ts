import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../../../../../../modules/product/models/product.entity';
import { FieldEntity, SectionType } from '../../../../../../modules/field/models/field.entity';
import { User } from '../../../../../../modules/user/models/user.entity';
import { GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { BookmarksStoreService } from '../../../../../../modules/bookmarks/bookmarks-store.service';
import { LoginService } from '../../../../../../modules/login/login.service';
import { PhoneService } from '../../../../../../modules/phone/phone.service';
import { DynamicFieldsService } from '../../../../../dynamic-fields/dynamic-fields.service';
import { ChatModalService } from '../../../../../chat/services/chat-modal.service';
import { PreferContact } from '../../../../enums/contact-values.enum';
import { ProductService } from '../../../../../../modules/product/product.service';
import { UserService } from '../../../../../../modules/user/user.service';
import { ProductDataService } from '../../../../../../modules/product/product-data.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
    product: Product;
    user: User;
    currentUser: User | undefined;
    similarProducts: GetProductsResponseDto;
    isPhoneVisible = false;
    userPhone: string;
    preferContact = PreferContact;
    private destroy$ = new Subject();

    @ViewChild('params', { read: ViewContainerRef })
    private paramsContainerRef: ViewContainerRef;

    @ViewChild('location', { read: ViewContainerRef })
    private locationContainerRef: ViewContainerRef;

    @ViewChild('price', { read: ViewContainerRef })
    private priceContainerRef: ViewContainerRef;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
        private dynamicFieldsService: DynamicFieldsService,
        private userService: UserService,
        private productDataService: ProductDataService,
        private bookmarksStoreService: BookmarksStoreService,
        private chatModalService: ChatModalService,
        private loginService: LoginService,
        private phoneService: PhoneService
    ) {
        this.bookmarksStoreService.loadBookmarks();
    }

    ngOnInit(): void {
        this.cd.detectChanges();
        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap((param: ParamMap) => {
                    const productId = param.get('product_id');
                    if (productId) {
                        return this.productService.getRecommendedByProductId(productId);
                    }
                    return EMPTY;
                })
            )
            .subscribe(res => {
                window.scrollTo(pageXOffset, 0);
                this.similarProducts = res;
                this.cd.detectChanges();
            });

        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(currentUser => {
            this.currentUser = currentUser;
            this.cd.detectChanges();
        });

        this.bookmarksStoreService.bookmarks$.subscribe(() => {
            this.setBookmarkFlag();
        });
    }

    ngAfterViewInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((param: ParamMap) => {
                    const productId = param.get('product_id');
                    if (productId) {
                        return this.productService.getProduct(productId);
                    }
                    return EMPTY;
                }),
                tap(product => {
                    this.product = product;
                    this.setBookmarkFlag();
                    this.countView();
                }),
                switchMap(product => {
                    return product.userId ? this.userService.getUser(product.userId) : EMPTY;
                })
            )
            .subscribe(
                user => {
                    this.user = user;
                    this.addParamsFields();
                    this.addPriceFields();
                    this.addLocationFields();
                    this.cd.detectChanges();
                },
                err => {
                    if (err?.error?.statusCode === 404) {
                        this.router.navigate(['/not-found']);
                    }
                }
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openChat(): void {
        if (!this.currentUser) {
            this.openModalLogin().subscribe(() => this.chatModalService.open(this.product, this.user));
        } else {
            this.chatModalService.open(this.product, this.user);
        }
    }

    showPhone(): void {
        const user$ = !this.currentUser ? this.openModalLogin() : of(this.currentUser);

        user$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(() => this.phoneService.getUserPhone(this.user.id, this.product.id))
            )
            .subscribe((phone: string) => {
                this.userPhone = phone;
                this.isPhoneVisible = true;
                this.cd.detectChanges();
            });
    }

    isContactAvailable(contact: string): boolean {
        if (this.currentUser?.id === this.user?.id) {
            return false;
        }
        const productPreferContact = this.product?.preferContact;
        if (!productPreferContact) {
            return true;
        }

        return productPreferContact === contact;
    }

    addToBookmarks(): void {
        this.bookmarksStoreService.createBookmark(this.product.id);
    }

    removeFromBookmarks(): void {
        this.bookmarksStoreService.deleteBookmark(this.product.id);
    }

    private setBookmarkFlag(): void {
        const bms = this.bookmarksStoreService.bookmarks$.getValue();
        if (this.product) {
            this.product.isBookmark = bms.findIndex(bm => bm.product.id === this.product.id) > -1;
            this.cd.markForCheck();
        }
    }

    private addParamsFields(): void {
        this.paramsContainerRef?.clear();
        const fields = this.product.fields.filter(s => s.section === SectionType.PARAMS);
        if (fields.length) {
            this.populateContainerWithFields(this.paramsContainerRef, fields);
        }
    }

    private openModalLogin(): Observable<User> {
        return this.loginService.openModal();
    }

    private addPriceFields(): void {
        this.priceContainerRef?.clear();
        const fieldsPrice = this.product.fields.filter(s => s.section === SectionType.PRICE);
        if (fieldsPrice.length) {
            this.populateContainerWithFields(this.priceContainerRef, fieldsPrice);
        }
    }

    private addLocationFields(): void {
        this.locationContainerRef?.clear();
        const fieldsLocations = this.product.fields.filter(s => s.section === SectionType.LOCATION);
        if (fieldsLocations.length) {
            this.populateContainerWithFields(this.locationContainerRef, fieldsLocations);
        }
    }

    private populateContainerWithFields(container: ViewContainerRef, fields: FieldEntity[]): void {
        fields.forEach(field => {
            const service = this.dynamicFieldsService.getService(field.type);
            if (!service) {
                return;
            }
            const resolver = service.getViewComponentResolver();
            if (!resolver) {
                return;
            }
            const component = container.createComponent(resolver);
            component.instance.field = field;
            component.changeDetectorRef.detectChanges();
        });
    }

    private countView(): void {
        this.userService
            .getCurrentUser()
            .pipe(
                switchMap(currentUser => {
                    if (currentUser && currentUser.id === this.product.userId) {
                        return EMPTY;
                    }
                    return this.productService.countView(this.product.id);
                }),
                take(1)
            )
            .subscribe();
    }
}
