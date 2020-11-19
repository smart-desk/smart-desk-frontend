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
import { NzCascaderOption } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { AdvertService, CategoryService, ModelService } from '../../../../shared/services';
import { Category } from '../../../../shared/models/dto/category.entity';
import { CreateAdvertDto } from '../../../../shared/models/dto/advert.dto';
import { Section } from '../../../../shared/models/dto/section.entity';
import { Field } from '../../../../shared/models/dto/field.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';

// todo check subscriptions
@Component({
    selector: 'app-advert-create',
    templateUrl: './advert-create.component.html',
    styleUrls: ['./advert-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCreateComponent implements OnInit {
    selectedCategoriesIds: string[] = [];
    selectedCategory: Category = null;
    categories: Category[] = [];
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    loadingForm$ = new BehaviorSubject<boolean>(false);
    loadingCategories$ = new BehaviorSubject<boolean>(true);

    title = '';

    private components: ComponentRef<AbstractFieldFormComponent<unknown>>[] = [];

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private categoryService: CategoryService,
        private advertService: AdvertService,
        private router: Router,
        private dynamicFieldService: DynamicFieldsService
    ) {}

    ngOnInit(): void {
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
        this.selectedCategory = this.categories.find(cat => cat.id === lastCategoryId);
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
        advert.title = this.title;
        advert.category_id = this.selectedCategory.id;
        advert.model_id = this.selectedCategory.modelId;
        advert.fields = this.components.map(component => component.instance.getValue()).filter(value => !!value);

        this.advertService.createAdvert(advert).subscribe(
            res => {
                this.router.navigate([res.category_id, res.id]);
            },
            err => {
                // todo server validation message
            }
        );
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

        // add inputs
        component.instance.field = field;

        // run onInit
        component.changeDetectorRef.detectChanges();

        return component;
    }

    private isValid(): boolean {
        if (!this.title) {
            return false;
        }
        return this.components.every(component => component.instance.isValid());
    }
}
