import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Advert } from '../../../../shared/models/models.dto';
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
    totalPages: number;

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
        this.totalPages = Math.ceil(res.total_count / res.limit);
        console.log('this.totlaPages', this.totalPages);
        this.adverts = res.data;
        this.isLoaded = true;
        this.cd.detectChanges();
    }
}
