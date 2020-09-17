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
    totalAdverts: number;
    pageSize: number;
    pageIndex: number;

    constructor(private advertDataService: AdvertDataService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.advertDataService.adverts$.subscribe(res => {
            this.initAdvertList(res);
        });
    }

    changePage(loadPage) {
        this.advertDataService.changePage(loadPage);
    }

    initAdvertList(res) {
        this.pageIndex = res.page;
        this.totalAdverts = res.total_count;
        this.pageSize = res.limit;
        this.adverts = res.data;
        this.isLoaded = true;
        this.cd.detectChanges();
    }
}
