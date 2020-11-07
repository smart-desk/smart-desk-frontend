import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AdvertService } from '../../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { AdvertResponse } from '../../../../shared/models/models.dto';

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertComponent implements OnInit {
    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;
    advert: AdvertResponse;

    constructor(
        private advertService: AdvertService,
        private route: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap(params => {
                    return this.advertService.getAdvert(params.get('advert_id'));
                })
            )
            .subscribe(advert => {
                this.advert = advert;
                this.cd.detectChanges();
                // this.populateFormWithInputs(advert.sections);
            });
    }

    // private populateFormWithInputs(sections: AdvertSection[]): void {
    //     sections.forEach(section => {
    //         if (section.fields) {
    //             section.fields.forEach(field => {
    //                 const component = this.resolveFieldComponent(field);
    //                 this.components.push(component);
    //             });
    //         }
    //     });
    // }
    //
    // private resolveFieldComponent(field: AdvertFieldBase): ComponentRef<FieldFormComponent<unknown>> {
    //     const resolver = getFieldComponentResolver(this.componentFactoryResolver, field.type as FieldTypes);
    //     const component = this.fieldsFormContainerRef.createComponent(resolver);
    //
    //     component.instance.field = field;
    //
    //     // tslint:disable-next-line:prefer-for-of
    //     for (let i = 0; i < this.advert.sections.length; i++) {
    //         if (this.advert.sections[i].fields) {
    //             const advertField = this.advert.sections[i].fields.find(f => f.field_id === field.id);
    //             component.instance.advertField = advertField;
    //             if (advertField) {
    //                 break;
    //             }
    //         }
    //     }
    //
    //     component.changeDetectorRef.detectChanges();
    //     return component;
    // }
}
