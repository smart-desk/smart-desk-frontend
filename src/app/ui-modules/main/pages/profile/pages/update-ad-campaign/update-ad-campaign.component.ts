import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdCampaignDirective } from '../ad-campaign.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-update-ad-campaign',
    templateUrl: './update-ad-campaign.component.html',
    styleUrls: ['./update-ad-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateAdCampaignComponent extends AdCampaignDirective implements OnInit {
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

        console.log('!!!', history.state);
        this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(param => console.log('???', param));
    }
}
