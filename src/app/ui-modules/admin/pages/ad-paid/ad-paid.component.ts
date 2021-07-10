import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AdCampaignDirective } from '../../../../modules/ad/ad-campaign.directive';
import { AdCampaignStatus } from '../../../../modules/ad/models/ad-campaign.entity';

@Component({
    selector: 'app-ad-paid',
    templateUrl: './ad-paid.component.html',
    styleUrls: ['./ad-paid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdPaidComponent extends AdCampaignDirective implements OnInit {
    ngOnInit(): void {
        this.getAd(AdCampaignStatus.PAID);
    }
}
