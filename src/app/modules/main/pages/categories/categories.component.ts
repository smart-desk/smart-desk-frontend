import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../../../shared/models/models.dto';
import { NzCascaderOption } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
    categories: Category[] = [];
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    loadingCategories$ = new BehaviorSubject<boolean>(true);
    selectedCategoriesIds: string[] = [];

    constructor(private categoryService: CategoryService, private router: Router) {}

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

    onCategorySelect($event): void {
        const selectedCat = $event[$event.length - 1];
        this.router.navigate([`/${selectedCat}`]);
    }
}
