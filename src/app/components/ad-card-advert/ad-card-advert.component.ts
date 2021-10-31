import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdCampaignCurrentDto } from '../../modules/ad/models/ad-campaign-current.dto';

@Component({
    selector: 'app-ad-campaign-card',
    templateUrl: './ad-card-advert.component.html',
    styleUrls: ['./ad-card-advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdCardAdvertComponent {
    @Input() campaign: AdCampaignCurrentDto;
}
