import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdCampaignListDirective } from '../../components/ad-campaign-list/ad-campaign-list.directive';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-update-ad-campaign',
    templateUrl: './update-ad-campaign.component.html',
    styleUrls: ['./update-ad-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateAdCampaignComponent extends AdCampaignListDirective implements OnInit {
    constructor(
        protected readonly adService: AdService,
        protected cd: ChangeDetectorRef,
        protected router: Router,
        private route: ActivatedRoute
    ) {
        super(adService, cd, router);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap(param => this.adService.getAdCampaign(param.get('id') || ''))
            )
            .subscribe(adData => (this.adCampaign = adData));
    }
}
