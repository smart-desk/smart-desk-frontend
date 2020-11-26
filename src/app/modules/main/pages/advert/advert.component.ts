import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AdvertService } from '../../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { Section } from '../../../../shared/models/dto/section.entity';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-view.component';

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertComponent implements OnInit {
    advert: Advert;

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(
        private advertService: AdvertService,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private dynamicFieldsService: DynamicFieldsService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(switchMap(params => this.advertService.getAdvert(params.get('advert_id')))).subscribe(advert => {
            this.advert = advert;
            this.populateFormWithInputs(advert.sections);
            this.cd.detectChanges();
        });
    }

    private populateFormWithInputs(sections: Section[]): void {
        sections.forEach(section => {
            if (section.fields) {
                section.fields.forEach(field => {
                    this.resolveFieldComponent(field);
                });
            }
        });
    }

    private resolveFieldComponent(field: FieldEntity): ComponentRef<AbstractFieldViewComponent<any, any>> {
        const service = this.dynamicFieldsService.getService(field.type);
        if (!service) {
            return;
        }

        const resolver = service.getViewComponentResolver();
        if (!resolver) {
            return;
        }
        // todo think about reusability
        const component = this.fieldsFormContainerRef.createComponent(resolver);
        component.instance.field = field;

        component.changeDetectorRef.detectChanges();
        return component;
    }
}
