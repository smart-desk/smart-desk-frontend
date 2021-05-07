import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { AbstractFieldFormComponent } from '../../../dynamic-fields/models/abstract-field-form.component';
import { AdvertService, CategoryService, ModelService } from '../../../../services';
import { Category } from '../../../../models/category/category.entity';
import { CreateAdvertDto } from '../../../../models/advert/advert.dto';
import { DynamicFieldsService } from '../../../dynamic-fields/dynamic-fields.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreferContact } from '../../enums/contact-values.enum';
import { AdvertFormBaseClass } from '../../classes/advert-form-base.class';

// todo check subscriptions
@Component({
    selector: 'app-advert-create',
    templateUrl: './advert-create.component.html',
    styleUrls: ['./advert-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCreateComponent extends AdvertFormBaseClass implements OnInit {
    preferContact = PreferContact;
    formDefaultFields: FormGroup;
    selectedCategoriesIds: string[] = [];
    selectedCategory: Category;
    categories: Category[] = [];
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    loadingForm$ = new BehaviorSubject<boolean>(false);
    loadingCategories$ = new BehaviorSubject<boolean>(true);
    @ViewChild('fields', { read: ViewContainerRef })
    protected fieldsFormContainerRef: ViewContainerRef;
    protected components: ComponentRef<AbstractFieldFormComponent<any, any>>[] = [];

    constructor(
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private categoryService: CategoryService,
        private advertService: AdvertService,
        private router: Router,
        protected dynamicFieldService: DynamicFieldsService
    ) {
        super(dynamicFieldService);
    }

    ngOnInit(): void {
        this.formDefaultFields = new FormGroup({
            title: new FormControl(undefined, [Validators.required]),
            preferredContact: new FormControl(null),
        });

        this.categoryService
            .getCategories()
            .pipe(
                tap(categories => (this.categories = [...categories])),
                map(categories => this.categoryService.transformArrayToTree(categories))
            )
            .subscribe(tree => {
                this.categoryTree$.next(tree);
                this.loadingCategories$.next(false);
            });
    }

    onCategorySelect(selectedCategoriesIds: string[]): void {
        if (!selectedCategoriesIds || !selectedCategoriesIds.length) {
            return;
        }

        this.loadingForm$.next(true);

        const lastCategoryId = selectedCategoriesIds[selectedCategoriesIds.length - 1];
        this.selectedCategory = this.categories.find(cat => cat.id === lastCategoryId) as Category;
        const modelId = this.selectedCategory.modelId;

        if (this.fieldsFormContainerRef) {
            this.fieldsFormContainerRef.clear();
        }
        this.modelService
            .getModel(modelId)
            .pipe(take(1))
            .subscribe(model => {
                this.populateFormWithInputs(model.sections);
                this.loadingForm$.next(false);
            });
    }

    save(): void {
        if (!this.isValid()) {
            return;
        }

        const advert = new CreateAdvertDto();
        advert.title = (this.formDefaultFields.get('title') as FormControl).value;
        advert.preferContact = (this.formDefaultFields.get('preferredContact') as FormControl).value;
        advert.category_id = this.selectedCategory.id;
        advert.model_id = this.selectedCategory.modelId;
        advert.fields = this.components.map(component => component.instance.getFieldData()).filter(value => !!value);

        this.advertService.createAdvert(advert).subscribe(
            res => {
                this.router.navigate(['adverts', res.id]);
            },
            err => {
                // todo server validation message
            }
        );
    }
}
