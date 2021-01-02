import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { AdvertService } from './advert.service';
import { AdvertsGetDto, AdvertsGetResponseDto } from '../../models/dto/advert.dto';

@Injectable()
export class AdvertDataService {
    adverts$ = new Subject<AdvertsGetResponseDto>();
    private categoryId: string;
    private options: AdvertsGetDto = new AdvertsGetDto();

    constructor(private router: Router, private advertService: AdvertService) {}

    loadAdvertsForCategory(categoryId: string, options?: AdvertsGetDto): void {
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

    applyFilters(filters: object): void {
        // todo
        this.options.filters = filters;
        this.requestAdverts();
        this.updateQueryParams();
    }

    private requestAdverts(): void {
        this.advertService.getAdverts(this.categoryId, this.options).subscribe(res => {
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
