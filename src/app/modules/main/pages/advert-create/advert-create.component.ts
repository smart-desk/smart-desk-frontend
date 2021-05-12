import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { AdvertService, CategoryService, ModelService } from '../../../../services';
import { Category } from '../../../../models/category/category.entity';
import { CreateAdvertDto } from '../../../../models/advert/advert.dto';
import { DynamicFieldsService } from '../../../dynamic-fields/dynamic-fields.service';
import { Model } from '../../../../models/model/model.entity';
import { Advert } from '../../../../models/advert/advert.entity';
import { cloneDeep } from 'lodash';

// todo check subscriptions
@Component({
    selector: 'app-advert-create',
    templateUrl: './advert-create.component.html',
    styleUrls: ['./advert-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCreateComponent implements OnInit {
    selectedCategoriesIds: string[] = [];
    selectedCategory: Category;
    categories: Category[] = [];
    advert: Advert;
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    loadingForm$ = new BehaviorSubject<boolean>(false);
    loadingCategories$ = new BehaviorSubject<boolean>(true);

    constructor(
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private categoryService: CategoryService,
        private advertService: AdvertService,
        private router: Router,
        protected dynamicFieldService: DynamicFieldsService
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
        const foundCategory = this.categories.find(cat => cat.id === lastCategoryId);
        if (foundCategory) {
            this.selectedCategory = foundCategory;
        }

        if (this.selectedCategory) {
            const modelId = this.selectedCategory.modelId;

            this.modelService
                .getModel(modelId)
                .pipe(take(1))
                .subscribe(model => {
                    this.advert = new Advert();
                    this.advert.fields = cloneDeep(model.fields);
                    this.loadingForm$.next(false);
                });
        }
    }

    save(advert: CreateAdvertDto): void {
        advert.category_id = this.selectedCategory.id;
        advert.model_id = this.selectedCategory.modelId;

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
