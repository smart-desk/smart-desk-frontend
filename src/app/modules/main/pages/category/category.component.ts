import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Advert } from '../../../../shared/models/models.dto';
import { AdvertDataService } from '../../../../shared/services/advert/advert-data.service';

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
    totlaPages: number;

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
        this.totlaPages = Math.ceil(res.total_count / res.limit);
        this.adverts = res.data;
        this.isLoaded = true;
        this.cd.detectChanges();
    }
}
