import { Component, Input, OnInit } from '@angular/core';
import { Advert, AdvertFieldBase } from '../../../../shared/models/models.dto';

@Component({
    selector: 'app-adverts-list',
    templateUrl: './adverts-list.component.html',
    styleUrls: ['./adverts-list.component.scss'],
})
export class AdvertsListComponent implements OnInit {
    @Input() adverts: Advert[];

    public advertsData: AdvertFieldBase[] = [];

    constructor() {}

    ngOnInit(): void {
        console.log('AdvertsListComponent', this.adverts);
        if (this.adverts) {
            this.adverts.map(advert => advert.data.map(dataItem => this.advertsData.push(dataItem)));
        }
        console.log('advertsData', this.advertsData);
    }
}
