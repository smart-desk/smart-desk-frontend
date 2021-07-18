import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdCampaignCurrentDto } from '../../modules/ad/models/ad-campaign-current.dto';

@Component({
    selector: 'app-ad-campaign-card',
    templateUrl: './ad-campaign-card.component.html',
    styleUrls: ['./ad-campaign-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdCampaignCardComponent {
    @Input() campaign: AdCampaignCurrentDto;
}
