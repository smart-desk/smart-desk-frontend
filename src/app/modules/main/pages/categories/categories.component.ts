import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdvertService, CategoryService } from '../../../../shared/services';
import { filter, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Advert, Category } from '../../../../shared/models/models.dto';
import { NzCascaderOption } from 'ng-zorro-antd';
import arrayToTree from 'array-to-tree';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
    public selectedCategoriesIds: string[] = [];
    public categories: Category[] = [];
    public categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    public loadingCategories$ = new BehaviorSubject<boolean>(true);
    public adverts: Advert[];

    constructor(private categoryService: CategoryService, private advertService: AdvertService) {}

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

    public onCategorySelect($event) {
        const selectedCat = $event[$event.length - 1];
        this.advertService
            .getAdverts()
            .pipe(
                map(adverts => adverts.filter(advert => advert.category_id === selectedCat)),
                tap(data => (this.adverts = data))
            )
            .subscribe(data => {
                console.log('$event', $event);
                console.log('getAdverts', data);
            });
    }
}
