import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AdvertService } from '../../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { SectionType } from '../../../../shared/models/dto/section.entity';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertComponent implements OnInit {
    advert: Advert;

    @ViewChild('params', { read: ViewContainerRef })
    private paramsContainerRef: ViewContainerRef;

    @ViewChild('contacts', { read: ViewContainerRef })
    private contactsContainerRef: ViewContainerRef;

    @ViewChild('location', { read: ViewContainerRef })
    private locationContainerRef: ViewContainerRef;

    @ViewChild('price', { read: ViewContainerRef })
    private priceContainerRef: ViewContainerRef;

    constructor(
        private advertService: AdvertService,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private dynamicFieldsService: DynamicFieldsService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(switchMap(params => this.advertService.getAdvert(params.get('advert_id')))).subscribe(advert => {
            this.advert = advert;

            this.addParamsFields();
            this.addContactsFields();
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

    private addContactsFields(): void {
        const section = this.advert.sections.find(s => s.type === SectionType.CONTACTS);
        if (section) {
            this.populateContainerWithFields(this.contactsContainerRef, section.fields);
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
