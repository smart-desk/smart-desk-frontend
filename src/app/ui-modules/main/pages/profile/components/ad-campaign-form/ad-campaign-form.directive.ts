import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdCampaignEntity, AdCampaignType, SHORT_DATE_FORMAT } from '../../../../../../modules/ad/models/ad-campaign.entity';
import { FormAdCampaignComponent } from '../../../../components/form-ad-campaign/form-ad-campaign.component';
import { AdConfigEntity } from '../../../../../../modules/ad/models/ad-config.entity';
import { Subject } from 'rxjs';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { AdCampaignsScheduleDto } from '../../../../../../modules/ad/models/ad-campaigns-schedule.dto';

@Directive({
    selector: '[appAdCampaign]',
})
export class AdCampaignFormDirective implements OnInit, OnDestroy {
    totalAmount: number;
    @Input() adCampaign: AdCampaignEntity;
    @ViewChild(FormAdCampaignComponent) formLink: FormAdCampaignComponent;
    destroy$ = new Subject();
    campaignSchedule: AdCampaignsScheduleDto;
    private adConfig: AdConfigEntity;
    constructor(protected readonly adService: AdService, protected cd: ChangeDetectorRef, protected router: Router) {}

    ngOnInit(): void {
        this.adService.getAdConfig().subscribe(adConfig => {
            this.adConfig = adConfig;
            this.cd.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    formValueChange(adCampaign: AdCampaignEntity): void {
        if (!this.adConfig) {
            return;
        }
        this.setDisabledRange(adCampaign.type);
        const selectedRate = adCampaign.type === AdCampaignType.MAIN ? this.adConfig.mainHourlyRate : this.adConfig.sidebarHourlyRate;
        const startDate = dayjs(adCampaign.startDate, SHORT_DATE_FORMAT);
        const endDate = dayjs(adCampaign.endDate, SHORT_DATE_FORMAT);
        const diffHours = endDate.diff(startDate, 'hour') + 1;
        this.totalAmount = diffHours * selectedRate;
        this.cd.detectChanges();
    }

    saveAdCampaign(): void {
        const campaignData = this.formLink.getAdCampaignData();
        if (this.adCampaign?.id) {
            this.adService
                .updateAdCampaign({ ...campaignData, id: this.adCampaign.id })
                .subscribe(() => this.router.navigate(['/profile/my-ad-campaigns']));
        } else {
            this.adService.createAdCampaign(campaignData).subscribe(() => this.router.navigate(['/profile/my-ad-campaigns']));
        }
    }

    setDisabledRange(adType: AdCampaignType): void {
        this.adService.getAdCampaignsSchedule(adType).subscribe(disabledDates => {
            this.campaignSchedule = disabledDates;
            this.cd.detectChanges();
        });
    }
}
