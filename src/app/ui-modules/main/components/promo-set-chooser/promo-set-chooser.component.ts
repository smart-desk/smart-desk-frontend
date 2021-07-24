import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PromoService } from '../../../../modules/promo/promo.service';
import { PromoSet } from '../../../../modules/promo/models/promo-set.entity';
import { Product } from '../../../../modules/product/models/product.entity';
import { StripeService } from '../../../../modules/stripe/stripe.service';

@Component({
    selector: 'app-promo-chooser',
    templateUrl: './promo-set-chooser.component.html',
    styleUrls: ['./promo-set-chooser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoSetChooserComponent implements OnInit {
    @Input()
    product: Product;

    selectedPromoSet: PromoSet;
    promoSets: PromoSet[];

    constructor(private promoService: PromoService, private cd: ChangeDetectorRef, private stripeService: StripeService) {}

    ngOnInit() {
        this.promoService.getPromoSets().subscribe(sets => {
            this.promoSets = sets;
            this.cd.detectChanges();
        });
    }

    selectPromoSet(promoSet: PromoSet): void {
        this.selectedPromoSet = promoSet;
        this.cd.detectChanges();
    }

    payPromoSet(): void {
        this.promoService.payPromo({ productId: this.product.id, promoSetId: this.selectedPromoSet.id }).subscribe(res => {
            if (this.stripeService.stripe) {
                this.stripeService.stripe.redirectToCheckout({ sessionId: res.id });
            }
        });
    }
}
