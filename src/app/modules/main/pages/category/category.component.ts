import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Advert, AdvertListResponse } from '../../../../shared/models/models.dto';
import { AdvertDataService } from '../../../../shared/services/advert/advert-data.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    providers: [AdvertDataService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
    adverts: Advert[];
    isLoaded: boolean;
    totalItems: number;

    constructor(private advertDataService: AdvertDataService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.advertDataService.adverts$.subscribe(res => {
            this.loading(res);
        });
    }

    loadPage(loadPage) {
        this.advertDataService.changePage(loadPage);
    }

    loading(res) {
        this.totalItems = res.limit;
        this.adverts = res.data;
        this.isLoaded = true;
        this.cd.detectChanges();
    }
}
