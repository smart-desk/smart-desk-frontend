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
import { AdvertRequest, AdvertResponse, Field, Model, Section } from '../../../../shared/models/models.dto';
import { FieldFormComponent } from '../../../../shared/components/field-form/field-form.component';
import { getFieldComponentResolver } from '../../../../shared/services/field-resolvers/field-resolvers';
import { FieldTypes } from '../../../../shared/models/field-metadata';
import { InputTextFormComponent } from '../../../../shared/components/input-text-form/input-text-form.component';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-advert-edit',
    templateUrl: './advert-edit.component.html',
    styleUrls: ['./advert-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertEditComponent implements OnInit {
    form: FormGroup;
    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;
    private components: ComponentRef<FieldFormComponent<unknown>>[] = [];
    private advert: AdvertResponse;

    constructor(
        private advertService: AdvertService,
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', [Validators.required]],
        });
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
                this.form.controls.title.setValue(this.advert.title);
                this.populateFormWithInputs(model.sections);
                this.cd.detectChanges();
            });
    }

    save(): void {
        if (this.isValid()) {
            const advert = new AdvertRequest();
            advert.data = this.components.map(component => component.instance.getValue()).filter(value => !!value);
            advert.title = this.form.controls.title.value;
            this.advertService.updateAdvert(this.advert.id, advert).subscribe(() => {
                this.router.navigate([this.advert.category_id, this.advert.id]);
            });
        }
    }

    private populateFormWithInputs(sections: Section[]): void {
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

    private isValid(): boolean {
        if (!this.form.valid) {
            return false;
        }
        return this.components.every(component => component.instance.isValid());
    }
}
