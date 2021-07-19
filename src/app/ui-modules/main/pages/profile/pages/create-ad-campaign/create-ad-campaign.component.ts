import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { Router } from '@angular/router';
import { AdCampaignFormDirective } from '../../components/ad-campaign-form/ad-campaign-form.directive';

@Component({
    selector: 'app-create-ad-campaign',
    templateUrl: './create-ad-campaign.component.html',
    styleUrls: ['./create-ad-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAdCampaignComponent extends AdCampaignFormDirective {
    constructor(protected readonly adService: AdService, protected cd: ChangeDetectorRef, protected router: Router) {
        super(adService, cd, router);
    }
}
