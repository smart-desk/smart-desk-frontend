import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertService } from './advert.service';
import { AdvertsGetDto, AdvertsGetResponseDto, Filters } from '../../models/dto/advert.dto';

@Injectable()
export class AdvertDataService {
    adverts$ = new Subject<AdvertsGetResponseDto>();
    private categoryId: string;
    private options: AdvertsGetDto = new AdvertsGetDto();

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private advertService: AdvertService) {
        // combineLatest([this.route.paramMap, this.route.queryParamMap])
        //     .pipe(
        //         switchMap(([params, queryParams]) => {
        //             const category = params.get('category_id');
        //             const requestOptions: AdvertsGetDto = {};
        //
        //             if (queryParams.has('page')) {
        //                 try {
        //                     requestOptions.page = parseInt(queryParams.get('page'), 10);
        //                 } catch (e) {}
        //             }
        //
        //             if (queryParams.has('limit')) {
        //                 try {
        //                     requestOptions.limit = parseInt(queryParams.get('limit'), 10);
        //                 } catch (e) {}
        //             }
        //
        //             if (queryParams.has('search')) {
        //                 requestOptions.search = queryParams.get('search');
        //             }
        //
        //             return this.advertService.getAdverts(category, requestOptions);
        //         })
        //     )
        //     .subscribe(data => {
        //         // todo !important! it is triggered on every page
        //         this.adverts$.next(data);
        //     });
    }

    loadAdvertsForCategory(categoryId: string, options?: AdvertsGetDto): void {
        this.categoryId = categoryId;
        this.options = options ? options : this.options;
        this.advertService.getAdverts(this.categoryId, this.options).subscribe(res => {
            this.adverts$.next(res);
        });
    }

    changePage(page: number): void {
        this.options.page = page;
        this.advertService.getAdverts(this.categoryId, this.options).subscribe(res => {
            this.adverts$.next(res);
        });
        // todo update route
    }

    resetPage(): void {
        this.options.page = 0;
        this.advertService.getAdverts(this.categoryId, this.options).subscribe(res => {
            this.adverts$.next(res);
        });
        // todo update route
    }

    search(phrase: string) {
        this.options.search = phrase;
        this.advertService.getAdverts(this.categoryId, this.options).subscribe(res => {
            this.adverts$.next(res);
        });
        // todo update route
    }

    applyFilters(filters: Filters[]): void {
        this.options.filters = filters;
        this.advertService.getAdverts(this.categoryId, this.options).subscribe(res => {
            this.adverts$.next(res);
        });
        // todo update route
    }
}
