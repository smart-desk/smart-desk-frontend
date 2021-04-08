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
import { EMPTY, of, Subject } from 'rxjs';
import { catchError, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AdvertDataService, AdvertService, UserService } from '../../../../shared/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Advert } from '../../../../shared/models/advert/advert.entity';
import { SectionType } from '../../../../shared/models/section/section.entity';
import { FieldEntity } from '../../../../shared/models/field/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { User } from '../../../../shared/models/user/user.entity';
import { GetAdvertsResponseDto } from '../../../../shared/models/advert/advert.dto';
import { BookmarksStoreService } from '../../../../shared/services/bookmarks/bookmarks-store.service';
import { LoginService } from '../../../../shared/services/login/login.service';
import { PhoneService } from '../../../../shared/services/phone/phone.service';

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertComponent implements OnInit, AfterViewInit, OnDestroy {
    advert: Advert;
    user: User;
    currentUser: User;
    similarAdverts: GetAdvertsResponseDto;
    isShowContacts = false;
    userPhone: string;
    private destroy$ = new Subject();

    @ViewChild('params', { read: ViewContainerRef })
    private paramsContainerRef: ViewContainerRef;

    @ViewChild('location', { read: ViewContainerRef })
    private locationContainerRef: ViewContainerRef;

    @ViewChild('price', { read: ViewContainerRef })
    private priceContainerRef: ViewContainerRef;

    constructor(
        private advertService: AdvertService,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private dynamicFieldsService: DynamicFieldsService,
        private userService: UserService,
        private advertDataService: AdvertDataService,
        private bookmarksStoreService: BookmarksStoreService,
        private router: Router,
        private loginService: LoginService,
        private phoneService: PhoneService
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap((param: ParamMap) => this.advertService.getRecommendedByAdvertId(param.get('advert_id')))
            )
            .subscribe(res => {
                this.similarAdverts = res;
                this.cd.detectChanges();
            });
        this.userService
            .getCurrentUser()
            .pipe()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    ngAfterViewInit(): void {
        this.route.paramMap
            .pipe(
                switchMap(params => this.advertService.getAdvert(params.get('advert_id'))),
                tap(advert => {
                    this.advert = advert;
                    this.countView();
                }),
                switchMap(advert => {
                    return advert.userId ? this.userService.getUser(advert.userId) : of(null);
                }),
                tap(user => (this.user = user)),
                switchMap(user => {
                    return this.phoneService.getUserPhone(user.id);
                })
            )
            .subscribe(phone => {
                this.userPhone = phone;
                this.addParamsFields();
                this.addPriceFields();
                this.addLocationFields();

                this.cd.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addBookmarkEvent(advertId: string) {
        this.bookmarksStoreService.createBookmark(advertId);
    }

    removeBookmarkEvent(advertId: string) {
        this.bookmarksStoreService.deleteBookmark(advertId);
    }

    showContact(): any {
        if (!this.currentUser) {
            this.loginUser();
        } else {
            this.isShowContacts = true;
            this.cd.detectChanges();
        }
    }

    private addParamsFields(): void {
        const section = this.advert.sections.find(s => s.type === SectionType.PARAMS);
        if (section) {
            this.populateContainerWithFields(this.paramsContainerRef, section.fields);
        }
    }

    private loginUser(): void {
        this.loginService
            .openModal()
            .pipe(
                takeUntil(this.destroy$),
                tap((currentUser: User) => (this.currentUser = currentUser)),
                switchMap(() => this.phoneService.getUserPhone(this.user.id)),
                catchError(e => {
                    console.error(e);
                    return of();
                })
            )
            .subscribe((phone: string) => {
                this.userPhone = phone;
                if (this.currentUser) {
                    this.loginService.updateLoginInfo();
                    this.isShowContacts = true;
                    this.cd.detectChanges();
                }
            });
    }

    private addPriceFields(): void {
        const section = this.advert.sections.find(s => s.type === SectionType.PRICE);
        if (section) {
            this.populateContainerWithFields(this.priceContainerRef, section.fields);
        }
    }

    private addLocationFields(): void {
        const section = this.advert.sections.find(s => s.type === SectionType.LOCATION);
        if (section) {
            this.populateContainerWithFields(this.locationContainerRef, section.fields);
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
                    if (currentUser && currentUser.id === this.advert.userId) {
                        return EMPTY;
                    }
                    return this.advertService.countView(this.advert.id);
                }),
                take(1)
            )
            .subscribe();
    }
}
