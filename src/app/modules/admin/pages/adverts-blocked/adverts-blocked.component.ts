import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdvertService, CategoryService } from '../../../../services';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../../../models/advert/advert.dto';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-adverts-blocked',
    templateUrl: './adverts-blocked.component.html',
    styleUrls: ['./adverts-blocked.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsBlockedComponent implements OnInit {
    advertResponse: GetAdvertsResponseDto;
    selectedItems = new Set<string>();

    constructor(private advertService: AdvertService, private router: Router, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getAdverts();
    }

    changePage(page: number): void {
        if (page !== this.advertResponse.page) {
            const options = new GetAdvertsDto();
            options.page = page;
            this.getAdverts(options);
        }
    }

    bulkAction(action: 'delete' | 'publish'): void {
        let requests = [];
        switch (action) {
            case 'delete':
                requests = [...this.selectedItems.values()].map(id => this.advertService.deleteAdvert(id));
                break;
            case 'publish':
                requests = [...this.selectedItems.values()].map(id => this.advertService.publishAdvert(id));
                break;
        }

        zip(...requests).subscribe(() => {
            this.selectedItems.clear();
            this.cd.detectChanges();
            this.getAdverts();
        });
    }

    delete(id: string): void {
        this.advertService.deleteAdvert(id).subscribe(() => {
            this.advertResponse.adverts = this.advertResponse.adverts.filter(advert => advert.id !== id);
            this.cd.detectChanges();
        });
    }

    publish(id: string): void {
        this.advertService.publishAdvert(id).subscribe(() => {
            this.advertResponse.adverts = this.advertResponse.adverts.filter(advert => advert.id !== id);
            this.cd.detectChanges();
        });
    }

    updateSelectedItems(id: string, checked: boolean): void {
        if (checked) {
            this.selectedItems.add(id);
        } else {
            this.selectedItems.delete(id);
        }
    }

    formatDate(date: Date | string): string {
        return dayjs(date).format('DD MMM YYYY HH:mm');
    }

    private getAdverts(options?: GetAdvertsDto): void {
        this.advertService.getBlocked(options).subscribe(res => {
            this.advertResponse = res;
            this.cd.detectChanges();
        });
    }
}
