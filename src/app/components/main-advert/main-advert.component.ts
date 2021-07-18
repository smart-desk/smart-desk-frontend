import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdCampaignCurrentDto } from '../../modules/ad/models/ad-campaign-current.dto';

@Component({
    selector: 'app-main-advert',
    templateUrl: './main-advert.component.html',
    styleUrls: ['./main-advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainAdvertComponent {
    @Input()
    adCampaign: AdCampaignCurrentDto;
}
