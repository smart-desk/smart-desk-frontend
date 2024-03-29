import { AdService } from '../../../../modules/ad/ad.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdCampaignEntity, AdCampaignStatus, AdCampaignType } from '../../../../modules/ad/models/ad-campaign.entity';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdCampaignReasonFormComponent } from '../../components/ad-campaign-reason-form/ad-campaign-reason-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AdCardAdvertComponent } from '../../../../components/ad-card-advert/ad-card-advert.component';
import { AdMainAdvertComponent } from '../../../../components/ad-main-advert/ad-main-advert.component';

@Component({
    selector: 'app-ad-campaign-list',
    templateUrl: './ad-campaign-list.component.html',
    styleUrls: ['./ad-campaign-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdCampaignListComponent implements OnInit, OnDestroy {
    adCampaigns: AdCampaignEntity[];
    status: AdCampaignStatus;
    adCampaignStatus = AdCampaignStatus;
    private destroy$ = new Subject();

    constructor(
        private readonly adService: AdService,
        private readonly modalService: NzModalService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(param => {
            this.status = param.get('status') as AdCampaignStatus;
            this.getCampaigns(this.status);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    viewAdCampaign(campaign: AdCampaignEntity): void {
        const modalRef: NzModalRef = this.modalService.create<AdCardAdvertComponent>({
            nzContent: campaign.type === AdCampaignType.MAIN ? AdMainAdvertComponent : AdCardAdvertComponent,
            nzComponentParams: { campaign },
            nzFooter: [
                {
                    show: this.status !== AdCampaignStatus.APPROVED && this.status !== AdCampaignStatus.PAID,
                    label: 'Одобрить',
                    onClick: () => this.approveCampaign(campaign.id, modalRef),
                },
                {
                    show: this.status !== AdCampaignStatus.REJECTED,
                    label: 'Отклонить',
                    onClick: () => {
                        modalRef.close();
                        this.openRejectModal(campaign.id);
                    },
                },
            ],
        });
    }

    openRejectModal(id: string): void {
        const modalReasonRef: NzModalRef = this.modalService.create<AdCampaignReasonFormComponent>({
            nzTitle: 'Хотите отклонить рекламную кампанию?',
            nzContent: AdCampaignReasonFormComponent,
            nzFooter: [
                {
                    label: 'Да',
                    type: 'primary',
                    danger: true,
                    disabled: modal => !modal?.form?.valid,
                    onClick: () => {
                        const reason = modalReasonRef.getContentComponent().form.get('reason')?.value;
                        this.rejectCampaign(id, reason, modalReasonRef);
                    },
                },
                {
                    label: 'Нет',
                    onClick: () => modalReasonRef.close(),
                },
            ],
        });
    }

    approveCampaign(id: string, modalRef?: NzModalRef): void {
        this.adService.approveAdCampaigns(id).subscribe(() => {
            this.getCampaigns(this.status);
            modalRef?.close();
        });
    }

    changeStatus() {
        this.router.navigate([], { relativeTo: this.route, queryParams: { status: this.status } });
    }

    private rejectCampaign(id: string, reason: string, modalRef?: NzModalRef): void {
        this.adService.rejectAdCampaigns(id, { reason }).subscribe(() => {
            this.getCampaigns(this.status);
            modalRef?.close();
        });
    }

    private getCampaigns(status?: AdCampaignStatus): void {
        this.adService.getAdCampaigns(status).subscribe(ads => {
            this.adCampaigns = ads;
            this.cd.detectChanges();
        });
    }
}
