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
import { AdvertService, ModelService } from '../../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractFieldFormComponent } from '../../../dynamic-fields/models/abstract-field-form.component';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Advert } from '../../../../models/advert/advert.entity';
import { Model } from '../../../../models/model/model.entity';
import { UpdateAdvertDto } from '../../../../models/advert/advert.dto';
import { DynamicFieldsService } from '../../../dynamic-fields/dynamic-fields.service';
import { PreferContact } from '../../enums/contact-values.enum';
import { AdvertFormBaseClass } from '../../classes/advert-form-base.class';

@Component({
    selector: 'app-advert-edit',
    templateUrl: './advert-edit.component.html',
    styleUrls: ['./advert-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertEditComponent extends AdvertFormBaseClass implements OnInit {
    form: FormGroup;
    preferContact = PreferContact;
    advert: Advert;
    @ViewChild('fields', { read: ViewContainerRef })
    protected fieldsFormContainerRef: ViewContainerRef;
    protected components: ComponentRef<AbstractFieldFormComponent<any, any>>[] = [];

    constructor(
        private advertService: AdvertService,
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        protected dynamicFieldService: DynamicFieldsService
    ) {
        super(dynamicFieldService);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', [Validators.required]],
            preferredContact: [null],
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
            .subscribe(() => {
                this.form.controls.title.setValue(this.advert.title);
                this.form.controls.preferredContact.setValue(this.advert.preferContact);
                this.populateFormWithInputs(this.advert.sections);
                this.cd.detectChanges();
            });
    }

    save(): void {
        if (this.isValid()) {
            const advert = new UpdateAdvertDto();
            advert.fields = this.components.map(component => component.instance.getFieldData()).filter(value => !!value);
            advert.title = this.form.controls.title.value;
            this.advertService.updateAdvert(this.advert.id, advert).subscribe(() => {
                this.router.navigate(['adverts', this.advert.id]);
            });
        }
    }
}
