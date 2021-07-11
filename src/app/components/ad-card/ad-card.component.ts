import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdCampaignEntity } from '../../modules/ad/models/ad-campaign.entity';

@Component({
    selector: 'app-ad-card',
    templateUrl: './ad-card.component.html',
    styleUrls: ['./ad-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdCardComponent {
    @Input() ad: AdCampaignEntity;
}
