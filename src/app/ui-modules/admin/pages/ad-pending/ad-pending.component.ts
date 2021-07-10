import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AdCampaignDirective } from '../../../../modules/ad/ad-campaign.directive';
import { AdCampaignStatus } from '../../../../modules/ad/models/ad-campaign.entity';

@Component({
    selector: 'app-ad-pending',
    templateUrl: './ad-pending.component.html',
    styleUrls: ['./ad-pending.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdPendingComponent extends AdCampaignDirective implements OnInit {
    ngOnInit(): void {
        this.getAd(AdCampaignStatus.PENDING);
    }
}
