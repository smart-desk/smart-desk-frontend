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
import { EMPTY, Observable, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AdvertDataService, AdvertService, UserService } from '../../../../../../services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Advert } from '../../../../../../services/advert/models/advert.entity';
import { FieldEntity, SectionType } from '../../../../../../services/field/models/field.entity';
import { User } from '../../../../../../services/user/models/user.entity';
import { GetAdvertsResponseDto } from '../../../../../../services/advert/models/advert.dto';
import { BookmarksStoreService } from '../../../../../../services/bookmarks/bookmarks-store.service';
import { LoginService } from '../../../../../../services/login/login.service';
import { PhoneService } from '../../../../../../services/phone/phone.service';
import { DynamicFieldsService } from '../../../../../dynamic-fields/dynamic-fields.service';
import { ChatModalService } from '../../../../../chat/services/chat-modal.service';
import { PreferContact } from '../../../../enums/contact-values.enum';

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertComponent implements OnInit, AfterViewInit, OnDestroy {
    advert: Advert;
    user: User;
    currentUser: User | undefined;
    similarAdverts: GetAdvertsResponseDto;
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
        private advertService: AdvertService,
        private route: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
        private dynamicFieldsService: DynamicFieldsService,
        private userService: UserService,
        private advertDataService: AdvertDataService,
        private bookmarksStoreService: BookmarksStoreService,
        private chatModalService: ChatModalService,
        private loginService: LoginService,
        private phoneService: PhoneService
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap((param: ParamMap) => {
                    const advertId = param.get('advert_id');
                    if (advertId) {
                        return this.advertService.getRecommendedByAdvertId(advertId);
                    }
                    return EMPTY;
                })
            )
            .subscribe(res => {
                this.similarAdverts = res;
                this.cd.detectChanges();
            });
        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(currentUser => {
            this.currentUser = currentUser;
        });
    }

    ngAfterViewInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((param: ParamMap) => {
                    const advertId = param.get('advert_id');
                    if (advertId) {
                        return this.advertService.getAdvert(advertId);
                    }
                    return EMPTY;
                }),
                tap(advert => {
                    this.advert = advert;
                    this.countView();
                }),
                switchMap(advert => {
                    return advert.userId ? this.userService.getUser(advert.userId) : EMPTY;
                })
            )
            .subscribe(user => {
                this.user = user;
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

    openChat(): void {
        this.chatModalService.open(this.advert, this.user);
    }

    showPhone(): void {
        const showPhoneReq: Observable<string> = !this.currentUser
            ? this.openModalLogin()
            : this.phoneService.getUserPhone(this.user.id, this.advert.id);

        showPhoneReq.pipe(takeUntil(this.destroy$)).subscribe((phone: string) => {
            this.userPhone = phone;
            this.isPhoneVisible = true;
            this.cd.detectChanges();
        });
    }

    isContactAvailable(contact: string): boolean {
        if (this.currentUser?.id === this.user?.id) {
            return false;
        }
        const advertPreferContact = this.advert?.preferContact;
        if (!advertPreferContact) {
            return true;
        }

        return advertPreferContact === contact;
    }

    private addParamsFields(): void {
        this.paramsContainerRef?.clear();
        const fields = this.advert.fields.filter(s => s.section === SectionType.PARAMS);
        if (fields.length) {
            this.populateContainerWithFields(this.paramsContainerRef, fields);
        }
    }

    private openModalLogin(): Observable<string> {
        return this.loginService.openModal().pipe(
            tap((currentUser: User) => (this.currentUser = currentUser)),
            switchMap(() => this.phoneService.getUserPhone(this.user.id, this.advert.id))
        );
    }

    private addPriceFields(): void {
        this.priceContainerRef?.clear();
        const fieldsPrice = this.advert.fields.filter(s => s.section === SectionType.PRICE);
        if (fieldsPrice.length) {
            this.populateContainerWithFields(this.priceContainerRef, fieldsPrice);
        }
    }

    private addLocationFields(): void {
        this.locationContainerRef?.clear();
        const fieldsLocations = this.advert.fields.filter(s => s.section === SectionType.LOCATION);
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
