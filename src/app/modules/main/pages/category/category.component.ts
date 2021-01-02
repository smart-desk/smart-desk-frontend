import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdvertDataService, CategoryService, ModelService } from '../../../../shared/services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdvertsGetDto, AdvertsGetResponseDto } from '../../../../shared/models/dto/advert.dto';
import { Category } from '../../../../shared/models/dto/category.entity';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { Model } from '../../../../shared/models/dto/model.entity';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    providers: [AdvertDataService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
    adverts: Advert[];
    model: Model;
    isLoaded: boolean;
    totalAdverts: number;
    pageSize: number;
    pageIndex: number;
    category: Category;

    constructor(
        private categoryService: CategoryService,
        private advertDataService: AdvertDataService,
        private modelService: ModelService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const categoryId = this.route.snapshot.paramMap.get('category_id');
        const options = this.parseQueryParams(this.route.snapshot.queryParamMap);

        this.advertDataService.loadAdvertsForCategory(categoryId, options);
        this.advertDataService.adverts$.subscribe(res => {
            this.initAdvertList(res);
        });

        this.categoryService
            .getCategory(categoryId)
            .pipe(
                switchMap(category => {
                    this.category = category;
                    return this.modelService.getModel(this.category.modelId);
                })
            )
            .subscribe(model => {
                this.model = model;
                this.cd.detectChanges();
            });
    }

    changePage(page: number) {
        this.advertDataService.changePage(page);
    }

    private initAdvertList(res: AdvertsGetResponseDto) {
        this.pageIndex = res.page;
        this.totalAdverts = res.totalCount;
        this.pageSize = res.limit;
        this.adverts = res.adverts;
        this.isLoaded = true;
        this.cd.detectChanges();
    }

    private parseQueryParams(queryParams: ParamMap): AdvertsGetDto {
        const resultParams = new AdvertsGetDto();

        if (queryParams.has('page')) {
            try {
                resultParams.page = parseInt(queryParams.get('page'), 10);
            } catch (e) {}
        }

        if (queryParams.has('limit')) {
            try {
                resultParams.limit = parseInt(queryParams.get('limit'), 10);
            } catch (e) {}
        }

        if (queryParams.has('search')) {
            resultParams.search = queryParams.get('search');
        }

        if (queryParams.has('filters')) {
            try {
                resultParams.filters = JSON.parse(queryParams.get('filters'));
            } catch (e) {}
        }
        return resultParams;
    }
}
