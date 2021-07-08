import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../../../../modules/user/models/user.entity';
import { AdService } from '../../../../../../modules/ad-campaign/ad-campaign.service';
import { UserService } from '../../../../../../modules/user/user.service';
import { StripeService } from '../../../../../../modules/stripe/stripe.service';

@Component({
    selector: 'app-ad-campaigns',
    templateUrl: './my-ad-campaigns.component.html',
    styleUrls: ['./my-ad-campaigns.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAdCampaignsComponent implements OnInit {
    user: User;

    constructor(
        private cdr: ChangeDetectorRef,
        private userService: UserService,
        private adService: AdService,
        private stripeService: StripeService
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cdr.detectChanges();
        });
    }

    pay(id: string): void {
        if (this.stripeService.stripe) {
            this.adService
                .payCampaign(id)
                .pipe(switchMap(stripeSessionId => from(this.stripeService.stripe.redirectToCheckout({ sessionId: stripeSessionId }))))
                .subscribe(res => {
                    console.log(res);
                });
        }
    }
}
