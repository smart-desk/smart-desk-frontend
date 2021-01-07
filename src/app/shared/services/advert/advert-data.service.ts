import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { AdvertService } from './advert.service';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../models/dto/advert.dto';
import { Filters } from '../../modules/dynamic-fields/models/filter';

@Injectable({
    providedIn: 'root',
})
export class AdvertDataService {
    adverts$ = new Subject<GetAdvertsResponseDto>();
    private categoryId: string;
    private options: GetAdvertsDto = new GetAdvertsDto();

    constructor(private router: Router, private advertService: AdvertService) {}

    loadAdvertsForCategory(categoryId: string, options?: GetAdvertsDto): void {
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

    search(phrase: string) {
        this.options.search = phrase;
        this.requestAdverts();
        this.updateQueryParams();
    }

    applyFilters(filters: Filters): void {
        this.options.filters = filters;
        this.requestAdverts();
        this.updateQueryParams();
    }

    private requestAdverts(): void {
        this.advertService.getAdvertsForCategory(this.categoryId, this.options).subscribe(res => {
            this.adverts$.next(res);
        });
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
}
