import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AdvertService, ModelService } from '../../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert, AdvertRequest, AdvertResponse, Field, Model, Section } from '../../../../shared/models/models.dto';
import { FieldFormComponent } from '../../../../shared/components/field-form/field-form.component';
import { getFieldComponentResolver } from '../../../../shared/services/field-resolvers/field-resolvers';
import { FieldTypes } from '../../../../shared/models/field-metadata';
import { InputTextFormComponent } from '../../../../shared/components/input-text-form/input-text-form.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-advert-edit',
    templateUrl: './advert-edit.component.html',
    styleUrls: ['./advert-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertEditComponent implements OnInit {
    title = '';
    private components: ComponentRef<FieldFormComponent<unknown>>[] = [];
    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;
    private advert: AdvertResponse;
    @ViewChildren(InputTextFormComponent) input: QueryList<InputTextFormComponent>;

    constructor(
        private advertService: AdvertService,
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap(paramMap => this.advertService.getAdvert(paramMap.get('advert_id'))),
                switchMap(
                    (advert: AdvertResponse): Observable<Model> => {
                        this.advert = advert;
                        return this.modelService.getModel(advert.model_id);
                    }
                )
            )
            .subscribe((model: Model) => {
                this.populateFormWithInputs(model.sections);
                this.cd.detectChanges();
            });
    }

    private populateFormWithInputs(sections: Section[]): void {
        this.title = this.advert.title;
        sections.forEach(section => {
            if (section.fields) {
                section.fields.forEach(field => {
                    const component = this.resolveFieldComponent(field);
                    this.components.push(component);
                });
            }
        });
    }

    private resolveFieldComponent(field: Field): ComponentRef<FieldFormComponent<unknown>> {
        const resolver = getFieldComponentResolver(this.componentFactoryResolver, field.type as FieldTypes);
        const component = this.fieldsFormContainerRef.createComponent(resolver);

        component.instance.field = field;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.advert.sections.length; i++) {
            if (this.advert.sections[i].fields) {
                const advertField = this.advert.sections[i].fields.find(f => f.field_id === field.id);
                component.instance.advertField = advertField;
                if (advertField) {
                    break;
                }
            }
        }

        component.changeDetectorRef.detectChanges();
        return component;
    }

    save() {
        if (this.isValid()) {
            const advert = new AdvertRequest();
            advert.data = this.components.map(component => component.instance.getValue()).filter(value => !!value);
            advert.title = this.title;
            this.advertService.updateAdvert(this.advert.id, advert).subscribe(() => {
                this.router.navigate([this.advert.category_id, this.advert.id]);
            });
        }
    }

    private isValid(): boolean {
        if (!this.title) {
            return false;
        }
        return this.components.every(component => component.instance.isValid());
    }
}
