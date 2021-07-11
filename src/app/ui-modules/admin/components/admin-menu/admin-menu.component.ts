import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdCampaignStatus } from '../../../../modules/ad/models/ad-campaign.entity';

@Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenuComponent {
    adCampaignStatus = AdCampaignStatus;
}
