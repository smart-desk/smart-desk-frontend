import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NzCascaderOption } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { CategoryService } from '../../../../shared/services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    selectedCategoriesIds: string[] = [];

    constructor(private categoryService: CategoryService, private router: Router) {}

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .pipe(map(categories => this.categoryService.transformArrayToTree(categories)))
            .subscribe(tree => {
                this.categoryTree$.next(tree);
            });
    }

    onCategorySelect($event): void {
        const selectedCat = $event[$event.length - 1];
        this.router.navigate([`/${selectedCat}`]);
    }
}
