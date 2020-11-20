import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AdvertService, ModelService } from '../../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { Model } from '../../../../shared/models/dto/model.entity';
import { UpdateAdvertDto } from '../../../../shared/models/dto/advert.dto';
import { Section } from '../../../../shared/models/dto/section.entity';
import { Field } from '../../../../shared/models/dto/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';

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
    private components: ComponentRef<AbstractFieldFormComponent<any>>[] = [];
    private advert: Advert;

    constructor(
        private advertService: AdvertService,
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private dynamicFieldService: DynamicFieldsService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', [Validators.required]],
        });
        this.route.paramMap
            .pipe(
                switchMap(paramMap => this.advertService.getAdvert(paramMap.get('advert_id'))),
                switchMap(
                    (advert: Advert): Observable<Model> => {
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
            const advert = new UpdateAdvertDto();
            advert.fields = this.components.map(component => component.instance.getFieldData()).filter(value => !!value);
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

    private resolveFieldComponent(field: Field): ComponentRef<AbstractFieldFormComponent<unknown>> {
        const service = this.dynamicFieldService.getService(field.type);
        if (!service) {
            return;
        }
        const resolver = service.getFormComponentResolver();
        const component = this.fieldsFormContainerRef.createComponent(resolver);

        component.instance.field = field;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.advert.sections.length; i++) {
            if (this.advert.sections[i].fields) {
                const advertField = this.advert.sections[i].fields.find(f => f.id === field.id);
                component.instance.data = advertField;
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
        return this.components.every(component => component.instance.isFieldDataValid());
    }
}
