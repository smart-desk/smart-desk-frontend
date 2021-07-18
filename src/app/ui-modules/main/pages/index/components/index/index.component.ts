import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdCampaignType } from '../../../../../../modules/ad/models/ad-campaign.entity';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { AdCampaignCurrentDto } from '../../../../../../modules/ad/models/ad-campaign-current.dto';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
    mainAdCampaign: AdCampaignCurrentDto;

    constructor(private adService: AdService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.adService.getAdCampaignsCurrent(AdCampaignType.MAIN).subscribe(campaign => {
            this.mainAdCampaign = campaign;
            this.cd.detectChanges();
        });
    }
}
