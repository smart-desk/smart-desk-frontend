import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { AdvertService } from './advert.service';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../models/advert/advert.dto';
import { Filters } from '../../modules/dynamic-fields/models/filter';

@Injectable({
    providedIn: 'root',
})
export class AdvertDataService {
    adverts$ = new Subject<GetAdvertsResponseDto>();
    private categoryId: string;
    private options: GetAdvertsDto = new GetAdvertsDto();

    constructor(private route: ActivatedRoute, private router: Router, private advertService: AdvertService) {}

    loadAdverts(categoryId: string, options?: GetAdvertsDto): void {
        this.categoryId = categoryId;
        this.options = options ? options : this.options;
        this.requestAdverts();
        this.updateQueryParams();
    }

    changePage(page: number): void {
        this.options.page = page;
        this.requestAdverts();
        this.updateQueryParams();
    }

    search(phrase: string): void {
        this.options.search = phrase;
        this.requestAdverts();
        this.updateQueryParams();
    }

    globalSearch(phrase: string): void {
        this.options.search = phrase;
        this.directionToGlobalSearchPage();
    }

    applyFilters(filters: Filters): void {
        this.options.filters = filters;
        this.requestAdverts();
        this.updateQueryParams();
    }

    parseQueryParams(queryParams: ParamMap): GetAdvertsDto {
        const resultParams = new GetAdvertsDto();

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

    private requestAdverts(): void {
        const req = this.categoryId
            ? this.advertService.getAdvertsForCategory(this.categoryId, this.options)
            : this.advertService.getAdverts(this.options);

        req.subscribe(res => this.adverts$.next(res));
    }

    private updateQueryParams(): void {
        const extras: NavigationExtras = {
            queryParams: {
                page: this.options.queryParamPage,
                limit: this.options.queryParamLimit,
                search: this.options.queryParamSearch,
                filters: this.options.queryParamFilters,
            },
        };

        this.router.navigate([], extras).then();
    }

    private directionToGlobalSearchPage() {
        if (this.options.search) {
            this.router.navigate(['app-search'], { queryParams: { search: this.options.search } });
        } else {
            this.router.navigate(['app-search']);
        }
        this.loadAdverts(null, { search: this.options.search } as GetAdvertsDto);
    }
}
