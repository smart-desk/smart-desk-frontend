import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Subject } from 'rxjs';
import { AdvertListResponse } from '../../models/models.dto';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertRequestOptions, AdvertService } from './advert.service';

@Injectable()
export class AdvertDataService {
    adverts$ = new Subject<AdvertListResponse>();

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private advertService: AdvertService) {
        combineLatest([this.route.paramMap, this.route.queryParamMap])
            .pipe(
                switchMap(([params, queryParams]) => {
                    const requestOptions: AdvertRequestOptions = {};

                    if (params.has('category_id')) {
                        requestOptions.categoryId = params.get('category_id');
                    }

                    if (queryParams.has('page')) {
                        try {
                            requestOptions.page = parseInt(queryParams.get('page'), 10);
                        } catch (e) {}
                    }

                    if (queryParams.has('search')) {
                        requestOptions.search = queryParams.get('search');
                    }

                    return this.advertService.getAdverts(requestOptions);
                })
            )
            .subscribe(data => {
                this.adverts$.next(data);
            });
    }

    changePage(page: number): void {
        this.router.navigate([], {
            queryParams: {
                ...this.route.snapshot.queryParams,
                page,
            },
        });
    }

    resetPage(): void {
        this.router.navigate([], {
            queryParams: {
                ...this.route.snapshot.queryParams,
                page: null,
            },
        });
    }

    search(phrase: string) {
        this.router.navigate([], {
            queryParams: {
                ...this.route.snapshot.queryParams,
                search: phrase,
            },
        });
    }
}
