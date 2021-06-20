import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { Category } from '../../../../../../modules/category/models/category.entity';
import { CreateAdvertDto } from '../../../../../../modules/advert/models/advert.dto';
import { Advert } from '../../../../../../modules/advert/models/advert.entity';
import { cloneDeep } from 'lodash';
import { transformCategoryArrayToNZCascade } from '../../../../../../utils';
import { AdvertService } from '../../../../../../modules/advert/advert.service';
import { CategoryService } from '../../../../../../modules/category/category.service';
import { ModelService } from '../../../../../../modules/model/model.service';

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
        private router: Router
    ) {}

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .pipe(
                tap(categories => (this.categories = [...categories])),
                map(categories => transformCategoryArrayToNZCascade(categories))
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
