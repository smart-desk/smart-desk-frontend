import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { AdConfigEntity } from '../../../../../../modules/ad/models/ad-config.entity';
import { Subject } from 'rxjs';
import { AdCampaignEntity, AdCampaignType } from '../../../../../../modules/ad/models/ad-campaign.entity';
import * as dayjs from 'dayjs';
import { FormAdCampaignComponent } from '../../../../components/form-ad-campaign/form-ad-campaign.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-ad-campaign',
    templateUrl: './create-ad-campaign.component.html',
    styleUrls: ['./create-ad-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAdCampaignComponent implements OnInit, OnDestroy {
    totalAmount: number;
    @ViewChild('form') formLink: FormAdCampaignComponent;
    private adConfig: AdConfigEntity;
    private destroy$ = new Subject();
    constructor(private adService: AdService, private cd: ChangeDetectorRef, private router: Router) {}

    ngOnInit(): void {
        this.adService.getAdConfig().subscribe(adConfig => (this.adConfig = adConfig));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    saveCampaign(): void {
        const campaignOptions = this.formLink.saveCampaign();
        if (!campaignOptions.id) {
            this.adService.createAdCampaign(campaignOptions).subscribe(() => {
                this.router.navigate(['/profile/my-ad-campaigns']);
            });
        } else {
            // todo: реализовать кейс обновления
            // this.adService.updateAdCampaign(campaignOptions).subscribe();
        }
    }

    formValueChange(adCampaign: AdCampaignEntity) {
        const selectedRate = adCampaign.type === AdCampaignType.MAIN ? this.adConfig.mainHourlyRate : this.adConfig.sidebarHourlyRate;
        const startDate = dayjs(adCampaign.startDate);
        const endDate = dayjs(adCampaign.endDate);
        const diffHours = endDate.diff(startDate, 'hour') + 1;
        this.totalAmount = diffHours * selectedRate;
        this.cd.detectChanges();
    }
}
