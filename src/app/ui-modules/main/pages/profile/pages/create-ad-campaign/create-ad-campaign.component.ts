import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { AdConfigEntity } from '../../../../../../modules/ad/models/ad-config.entity';
import { Subject } from 'rxjs';
import { AdCampaignType } from '../../../../../../modules/ad/models/ad-campaign.entity';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AdCampaignDto } from '../../../../../../modules/ad/models/ad-campaign.dto';
import * as dayjs from 'dayjs';
import { FormAdCampaignComponent } from '../../../../../../components/form-ad-campaign/form-ad-campaign.component';

@Component({
    selector: 'app-create-ad-campaign',
    templateUrl: './create-ad-campaign.component.html',
    styleUrls: ['./create-ad-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAdCampaignComponent implements OnInit, OnDestroy {
    totalSum = 0;
    selectedRate: number;
    file: NzUploadFile[] = [];
    @ViewChild('form') formLink: FormAdCampaignComponent;
    private rate: AdConfigEntity;
    private destroy$ = new Subject();
    constructor(private adService: AdService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.adService.getAdConfig().subscribe(rateValue => (this.rate = rateValue));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    saveCampaign(): void {
        const campaignOptions = this.formLink.saveCampaign();
        if (!campaignOptions.id) {
            this.adService.createAdCampaign(campaignOptions).subscribe();
        } else {
            // todo: реализовать кейс обновления
            // this.adService.updateAdCampaign(campaignOptions).subscribe();
        }
    }

    formValueChange($event: Record<any, any>) {
        switch ($event.control) {
            case 'type':
                $event.value === AdCampaignType.MAIN
                    ? (this.selectedRate = this.rate.mainHourlyRate)
                    : (this.selectedRate = this.rate.sidebarHourlyRate);
                this.cd.detectChanges();
                break;
            case 'timeRange':
                const [startDate, endDate] = $event.value;
                this.totalSum = dayjs(endDate).endOf('day').diff(dayjs(startDate).startOf('day'), 'hour') * this.selectedRate;
                this.cd.detectChanges();
                break;
        }
    }
}
