import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AdvertService, UserService } from '../../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { SectionType } from '../../../../shared/models/dto/section.entity';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { User } from '../../../../shared/models/dto/user/user.entity';

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertComponent implements AfterViewInit {
    advert: Advert;
    user: User;

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
        private userService: UserService
    ) {}

    ngAfterViewInit(): void {
        this.route.paramMap
            .pipe(
                switchMap(params => this.advertService.getAdvert(params.get('advert_id'))),
                tap(advert => (this.advert = advert)),
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
}
