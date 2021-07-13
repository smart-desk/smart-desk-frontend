import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../../../../modules/user/models/user.entity';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { UserService } from '../../../../../../modules/user/user.service';
import { StripeService } from '../../../../../../modules/stripe/stripe.service';
import { AdCampaignEntity, AdCampaignStatus } from '../../../../../../modules/ad/models/ad-campaign.entity';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormAdCampaignComponent } from '../../../../components/form-ad-campaign/form-ad-campaign.component';

@Component({
    selector: 'app-ad-campaigns',
    templateUrl: './my-ad-campaigns.component.html',
    styleUrls: ['./my-ad-campaigns.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAdCampaignsComponent implements OnInit {
    user: User;
    ads: AdCampaignEntity[];
    adsStatus = AdCampaignStatus;

    constructor(
        private cdr: ChangeDetectorRef,
        private userService: UserService,
        private adService: AdService,
        private stripeService: StripeService,
        private modalService: NzModalService
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cdr.detectChanges();
        });

        this.adService.getAdCampaigns().subscribe(adData => {
            this.ads = adData;
            this.cdr.detectChanges();
        });
    }

    showPayPage(id: string): void {
        if (this.stripeService.stripe) {
            this.adService
                .payCampaign(id)
                .pipe(switchMap(stripeSessionId => from(this.stripeService.stripe.redirectToCheckout({ sessionId: stripeSessionId }))))
                .subscribe(res => {
                    console.log(res);
                });
        }
    }

    showEditModal(id: string): void {
        const editAd = this.ads.find(ad => ad.id === id);
        const modalRef: NzModalRef = this.modalService.create<FormAdCampaignComponent>({
            nzContent: FormAdCampaignComponent,
            nzComponentParams: { adData: editAd },
            nzFooter: [
                {
                    label: 'Сохранить',
                    type: 'primary',
                    danger: true,
                    disabled: modal => !modal?.form?.valid,
                    onClick: () => {
                        const adCampaignEntity = modalRef.getContentComponent()?.getAdCampaignData();
                        this.adService.updateAdCampaign(adCampaignEntity).subscribe();
                        modalRef.close();
                    },
                },
            ],
        });
    }

    editButtonDisplayConditions(ad: AdCampaignEntity): boolean {
        return ad.status === this.adsStatus.PENDING || ad.status === this.adsStatus.REJECTED || ad.status === this.adsStatus.APPROVED;
    }

    payButtonDisplayConditions(ad: AdCampaignEntity): boolean {
        return ad.status === this.adsStatus.APPROVED;
    }
}
