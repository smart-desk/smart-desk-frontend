import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../../../services/advert/models/advert.dto';
import { AdvertService } from '../../../../services';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-adverts-pending',
    templateUrl: './adverts-pending.component.html',
    styleUrls: ['./adverts-pending.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsPendingComponent implements OnInit {
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

    bulkAction(action: 'delete' | 'publish' | 'block'): void {
        let requests = [];
        switch (action) {
            case 'delete':
                requests = [...this.selectedItems.values()].map(id => this.advertService.deleteAdvert(id));
                break;
            case 'publish':
                requests = [...this.selectedItems.values()].map(id => this.advertService.publishAdvert(id));
                break;
            case 'block':
                requests = [...this.selectedItems.values()].map(id => this.advertService.blockAdvert(id));
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

    block(id: string): void {
        this.advertService.blockAdvert(id).subscribe(() => {
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
        this.advertService.getPending(options).subscribe(res => {
            this.advertResponse = res;
            this.cd.detectChanges();
        });
    }
}
