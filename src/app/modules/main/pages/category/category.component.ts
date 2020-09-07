import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AdvertService } from '../../../../shared/services';
import { Advert } from '../../../../shared/models/models.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    adverts: Advert[];
    /*Флаг загрузки объявлений*/
    loadAdverts = false;
    /*Флаг присутствия данных*/
    noData: boolean;

    constructor(private advertService: AdvertService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.noData = false;
        this.route.paramMap
            .pipe(
                switchMap(params => {
                    return this.advertService
                        .getAdverts()
                        .pipe(map(adverts => adverts.filter(advert => advert.category_id === params.get('category_id'))));
                })
            )
            .subscribe(data => {
                if (data) {
                    this.adverts = data;
                    return (this.loadAdverts = true);
                }
                return (this.noData = true);
            });
    }
}
