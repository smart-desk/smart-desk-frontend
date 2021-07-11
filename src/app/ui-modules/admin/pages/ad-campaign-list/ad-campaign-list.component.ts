import { AdService } from '../../../../modules/ad/ad.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AdCampaignEntity, AdCampaignStatus } from '../../../../modules/ad/models/ad-campaign.entity';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import * as dayjs from 'dayjs';
import { AdCardComponent } from '../../components/ad-card/ad-card.component';
import { AdRejectReasonComponent } from '../../components/ad-modal/ad-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-ad-campaign-list',
    templateUrl: './ad-campaign-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdCampaignListComponent implements OnInit, OnDestroy {
    ads: AdCampaignEntity[];
    viewedAd: AdCampaignEntity | undefined;
    protected destroy$ = new Subject();

    constructor(
        private readonly adService: AdService,
        private readonly modalService: NzModalService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParamMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap(param => this.adService.getAdCampaigns(param.get('status') || undefined))
            )
            .subscribe(ads => {
                this.ads = ads;
                this.cd.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    viewAdCampaign(id: string): void {
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
