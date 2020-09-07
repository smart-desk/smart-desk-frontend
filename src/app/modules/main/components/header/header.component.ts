import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../shared/models/models.dto';
import { BehaviorSubject } from 'rxjs';
import { NzCascaderOption } from 'ng-zorro-antd';
import { CategoryService } from '../../../../shared/services';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    constructor(private categoryService: CategoryService, private router: Router) {}

    categories: Category[] = [];
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    loadingCategories$ = new BehaviorSubject<boolean>(true);
    selectedCategoriesIds: string[] = [];

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
