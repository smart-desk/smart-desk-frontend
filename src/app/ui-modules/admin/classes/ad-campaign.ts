import { AdService } from '../../../modules/ad/ad.service';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdCampaignEntity } from '../../../modules/ad/models/ad-campaign.entity';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import * as dayjs from 'dayjs';
import { FormAdCampaignComponent } from '../../../components/form-ad-campaign/form-ad-campaign.component';

@Component({
    template: '',
})
export class AdCampaignComponent implements OnDestroy {
    public ads: AdCampaignEntity[];
    protected destroy$ = new Subject();
    constructor(protected readonly adService: AdService, protected readonly modalService: NzModalService) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getAd(type: string): void {
        this.adService
            .getAdCampaigns(type)
            .pipe(takeUntil(this.destroy$))
            .subscribe(ads => (this.ads = ads));
    }

    showAds(id: string): void {
        const editAd = this.ads.find(ad => ad.id === id);
        const modalRef: NzModalRef = this.modalService.create<FormAdCampaignComponent>({
            nzContent: FormAdCampaignComponent,
            nzComponentParams: { adData: editAd },
            // todo: обработать нажатие кнопки окей
            // nzOnOk: () => modalRef.getContentComponent().submit(),
        });
    }

    formatDate(date: Date | string): string {
        return dayjs(date).format('DD MMM YYYY HH:mm');
    }
}
