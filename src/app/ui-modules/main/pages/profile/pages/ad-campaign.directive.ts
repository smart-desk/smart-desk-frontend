import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdCampaignEntity, AdCampaignType } from '../../../../../modules/ad/models/ad-campaign.entity';
import { FormAdCampaignComponent } from '../../../components/form-ad-campaign/form-ad-campaign.component';
import { AdConfigEntity } from '../../../../../modules/ad/models/ad-config.entity';
import { Subject } from 'rxjs';
import { AdService } from '../../../../../modules/ad/ad.service';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';

@Directive({
    selector: '[appAdCampaign]',
})
export class AdCampaignDirective implements OnInit, OnDestroy {
    totalAmount: number;
    @Input() adCampaign: AdCampaignEntity;
    @ViewChild('form') formLink: FormAdCampaignComponent;
    destroy$ = new Subject();
    private adConfig: AdConfigEntity;
    constructor(protected readonly adService: AdService, protected cd: ChangeDetectorRef, protected router: Router) {}

    ngOnInit(): void {
        this.adService.getAdConfig().subscribe(adConfig => (this.adConfig = adConfig));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    formValueChange(adCampaign: AdCampaignEntity) {
        const selectedRate = adCampaign.type === AdCampaignType.MAIN ? this.adConfig.mainHourlyRate : this.adConfig.sidebarHourlyRate;
        const startDate = dayjs(adCampaign.startDate);
        const endDate = dayjs(adCampaign.endDate);
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
}
