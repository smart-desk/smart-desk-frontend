import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AdCampaignDirective } from '../../../../modules/ad/ad-campaign.directive';
import { AdCampaignStatus } from '../../../../modules/ad/models/ad-campaign.entity';

@Component({
    selector: 'app-ad-reject',
    templateUrl: './ad-reject.component.html',
    styleUrls: ['./ad-reject.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdRejectComponent extends AdCampaignDirective implements OnInit {
    ngOnInit(): void {
        this.getAd(AdCampaignStatus.REJECTED);
    }
}
