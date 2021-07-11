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
    adCampaigns: AdCampaignEntity[];
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
                switchMap(param => this.getCampaigns(param.get('status') || undefined))
            )
            .subscribe(ads => {
                this.adCampaigns = ads;
                this.cd.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    viewAdCampaign(id: string): void {
        const viewedAd = this.adCampaigns.find(ad => ad.id === id);
        const modalRef: NzModalRef = this.modalService.create<AdCardComponent>({
            nzContent: AdCardComponent,
            nzComponentParams: { ad: viewedAd },
            nzFooter: [
                {
                    label: 'Одобрить',
                    onClick: () => this.approveCampaign(id, modalRef),
                },
                {
                    label: 'Отклонить',
                    onClick: () => {
                        modalRef.close();
                        this.openRejectModal(id);
                    },
                },
            ],
        });
    }

    openRejectModal(id: string): void {
        const modalReasonRef: NzModalRef = this.modalService.create<AdRejectReasonComponent>({
            nzTitle: 'Хотите отклонить рекламную кампанию?',
            nzContent: AdRejectReasonComponent,
            nzFooter: [
                {
                    label: 'Да',
                    type: 'danger',
                    danger: true,
                    disabled: modal => !modal?.form?.valid,
                    onClick: () => {
                        const reason = modalReasonRef.getContentComponent().form.get('reason')?.value;
                        this.rejectCampaign(id, reason, modalReasonRef);
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
    }

    formatDate(date: Date | string): string {
        return dayjs(date).format('DD MMM YYYY HH:mm');
    }

    private approveCampaign(id: string, modalRef?: NzModalRef): void {
        this.adService.approveAdCampaigns(id).subscribe(() => modalRef?.close());
    }

    private rejectCampaign(id: string, reason: string, modalRef?: NzModalRef): void {
        this.adService.rejectAdCampaigns(id, { reason }).subscribe(() => modalRef?.close());
    }

    private getCampaigns(status?: string) {
        return this.adService.getAdCampaigns(status);
    }
}
