import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../../../../modules/user/models/user.entity';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { UserService } from '../../../../../../modules/user/user.service';
import { StripeService } from '../../../../../../modules/stripe/stripe.service';
import { AdCampaignEntity, AdCampaignStatus } from '../../../../../../modules/ad/models/ad-campaign.entity';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdCardComponent } from '../../../../../../components/ad-card/ad-card.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ad-campaigns',
    templateUrl: './my-ad-campaigns.component.html',
    styleUrls: ['./my-ad-campaigns.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAdCampaignsComponent implements OnInit {
    user: User;
    adCampaigns: AdCampaignEntity[];
    adsStatus = AdCampaignStatus;

    constructor(
        private cdr: ChangeDetectorRef,
        private userService: UserService,
        private adService: AdService,
        private stripeService: StripeService,
        private modalService: NzModalService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cdr.detectChanges();
        });
        this.getAdCampaigns();
    }

    getAdCampaigns(): void {
        this.adService.getAdCampaigns().subscribe(adData => {
            this.adCampaigns = adData;
            this.cdr.detectChanges();
        });
    }

    navigateToPaymentPage(id: string): void {
        if (this.stripeService.stripe) {
            this.adService
                .payCampaign(id)
                .pipe(switchMap(stripeSessionId => from(this.stripeService.stripe.redirectToCheckout({ sessionId: stripeSessionId }))))
                .subscribe(res => {
                    console.log(res);
                });
        }
    }

    navigateToCampaignPage(id: string): void {
        const editAd = this.adCampaigns.find(ad => ad.id === id);
        this.router.navigate(['./profile/my-ad-campaigns/update'], { state: editAd });
    }

    showAdCampaign(id: string): void {
        const viewedAd = this.adCampaigns.find(ad => ad.id === id);
        const modalRef: NzModalRef = this.modalService.create<AdCardComponent>({
            nzContent: AdCardComponent,
            nzComponentParams: { ad: viewedAd },
            nzFooter: null,
        });
    }

    deleteAdCampaign(adCampaign: AdCampaignEntity) {
        this.adService.deleteAdCampaign(adCampaign.id).subscribe(() => this.getAdCampaigns());
    }
}
