import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { from } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../../../../modules/user/models/user.entity';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { UserService } from '../../../../../../modules/user/user.service';
import { AdCampaignEntity } from '../../../../../../modules/ad/models/ad-campaign.entity';

@Component({
    selector: 'app-ad-campaigns',
    templateUrl: './my-ad-campaigns.component.html',
    styleUrls: ['./my-ad-campaigns.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAdCampaignsComponent implements OnInit {
    user: User;
    ads: AdCampaignEntity[];
    private stripe: Stripe;

    constructor(private cdr: ChangeDetectorRef, private userService: UserService, private adService: AdService) {
        from(loadStripe(environment.stripePublicKey)).subscribe(stripe => {
            if (stripe) {
                this.stripe = stripe;
            }
        });
    }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cdr.detectChanges();
        });
    }

    pay(id: string): void {
        if (this.stripe) {
            this.adService
                .payCampaign(id)
                .pipe(switchMap(stripeSessionId => from(this.stripe.redirectToCheckout({ sessionId: stripeSessionId }))))
                .subscribe(res => {
                    console.log(res);
                });
        }
    }

    edit(id: string): void {}
}
