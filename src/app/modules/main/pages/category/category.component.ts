import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdvertListResponse, AdvertResponse, Category } from '../../../../shared/models/models.dto';
import { AdvertDataService, CategoryService } from '../../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    providers: [AdvertDataService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
    adverts: AdvertResponse[];
    isLoaded: boolean;
    totalAdverts: number;
    pageSize: number;
    pageIndex: number;
    category$: Observable<Category>;

    constructor(
        private categoryService: CategoryService,
        private advertDataService: AdvertDataService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.category$ = this.route.paramMap.pipe(
            switchMap(params => {
                return this.categoryService.getCategory(params.get('category_id'));
            })
        );

        this.advertDataService.adverts$.subscribe(res => {
            this.initAdvertList(res);
        });
    }

    changePage(loadPage: number) {
        this.advertDataService.changePage(loadPage);
    }

    private initAdvertList(res: AdvertListResponse) {
        this.pageIndex = res.page;
        this.totalAdverts = res.total_count;
        this.pageSize = res.limit;
        this.adverts = res.data;
        this.isLoaded = true;
        this.cd.detectChanges();
    }
}
