import { AdService } from './ad.service';
import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdCampaignEntity, AdCampaignStatus } from './models/ad-campaign.entity';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import * as dayjs from 'dayjs';
import { AdCardComponent } from '../../ui-modules/admin/components/ad-card/ad-card.component';
import { AdRejectReasonComponent } from '../../ui-modules/admin/components/ad-modal/ad-modal.component';

@Directive()
export abstract class AdCampaignDirective implements OnDestroy {
    ads: AdCampaignEntity[];
    viewedAd: AdCampaignEntity | undefined;
    protected destroy$ = new Subject();

    constructor(protected readonly adService: AdService, protected readonly modalService: NzModalService, private cd: ChangeDetectorRef) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getAd(type: string): void {
        this.adService
            .getAdCampaigns(type)
            .pipe(takeUntil(this.destroy$))
            .subscribe(ads => {
                this.ads = ads;
                this.cd.detectChanges();
            });
    }

    showAds(id: string): void {
        this.viewedAd = this.ads.find(ad => ad.id === id);
        if (!this.viewedAd) {
            return;
        }
        const modalRef: NzModalRef = this.modalService.create<AdCardComponent>({
            nzContent: AdCardComponent,
            nzComponentParams: { ad: this.viewedAd },
            nzFooter: [
                {
                    label: 'Одобрить',
                    onClick: () => {
                        modalRef.close(AdCampaignStatus.APPROVED);
                    },
                },
                {
                    label: 'Отклонить',
                    onClick: () => {
                        modalRef.close(AdCampaignStatus.REJECTED);
                    },
                },
            ],
        });

        modalRef.afterClose.pipe(takeUntil(this.destroy$)).subscribe(updateStatus => {
            this.onClickCardButton(updateStatus);
        });
    }

    onClickCardButton(updateStatus: AdCampaignStatus): void {
        switch (updateStatus) {
            case AdCampaignStatus.APPROVED:
                if (this.viewedAd) {
                    this.viewedAd.status = updateStatus;
                }
                // todo: реализовать метод обновления рекламной кампании
                break;
            case AdCampaignStatus.REJECTED:
                const modalReasonRef: NzModalRef = this.modalService.create<AdRejectReasonComponent>({
                    nzTitle: 'Хотите отклонить рекламную кампанию?',
                    nzContent: AdRejectReasonComponent,
                    nzFooter: [
                        {
                            label: 'Да',
                            type: 'danger',
                            danger: true,
                            disabled: (modal: AdRejectReasonComponent | undefined) => {
                                return !modal?.form?.valid as boolean;
                            },
                            onClick: () => {
                                if (this.viewedAd) {
                                    this.viewedAd.status = updateStatus;
                                    this.viewedAd.reason = modalReasonRef.getContentComponent().form.get('reason')?.value;
                                    modalReasonRef.close();
                                    // todo: реализовать метод обновления рекламной кампании
                                }
                            },
                        },
                        {
                            label: 'Нет',
                            onClick: () => {
                                modalReasonRef.close();
                            },
                        },
                    ],
                });
                break;
        }
    }

    formatDate(date: Date | string): string {
        return dayjs(date).format('DD MMM YYYY HH:mm');
    }
}
