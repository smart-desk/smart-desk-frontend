import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { EMPTY, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AdvertDataService, AdvertService, UserService } from '../../../../shared/services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Advert } from '../../../../shared/models/advert/advert.entity';
import { SectionType } from '../../../../shared/models/section/section.entity';
import { FieldEntity } from '../../../../shared/models/field/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { User } from '../../../../shared/models/user/user.entity';
import { GetAdvertsResponseDto } from '../../../../shared/models/advert/advert.dto';
import { BookmarksStoreService } from '../../../../shared/services/bookmarks/bookmarks-store.service';
import { ChatModalService } from '../../../../shared/modules/chat/services/chat-modal.service';

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertComponent implements OnInit, AfterViewInit {
    advert: Advert;
    user: User;
    similarAdverts: GetAdvertsResponseDto;
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
        private chatModalService: ChatModalService
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
    addBookmarkEvent(advertId: string) {
        this.bookmarksStoreService.createBookmark(advertId);
    }

    removeBookmarkEvent(advertId: string) {
        this.bookmarksStoreService.deleteBookmark(advertId);
    }

    openChat(): void {
        this.chatModalService.open();
    }

    private addParamsFields(): void {
        const section = this.advert.sections.find(s => s.type === SectionType.PARAMS);
        if (section) {
            this.populateContainerWithFields(this.paramsContainerRef, section.fields);
        }
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
