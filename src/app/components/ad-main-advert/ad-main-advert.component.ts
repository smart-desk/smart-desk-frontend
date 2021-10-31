import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdCampaignCurrentDto } from '../../modules/ad/models/ad-campaign-current.dto';

@Component({
    selector: 'app-main-advert',
    templateUrl: './ad-main-advert.component.html',
    styleUrls: ['./ad-main-advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdMainAdvertComponent {
    @Input()
    adCampaign: AdCampaignCurrentDto;
}
