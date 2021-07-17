import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PromoSet } from '../../../../modules/promo/models/promo-set.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-promo-set-form',
    templateUrl: './promo-set-form.component.html',
    styleUrls: ['./promo-set-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoSetFormComponent implements OnInit {
    @Input()
    promoSet: PromoSet;

    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [this.promoSet?.name || '', Validators.required],
            days: [this.promoSet?.days || null, Validators.required],
            price: [this.promoSet?.price || null, Validators.required],
        });
    }

    savePromoSet(): PromoSet {
        const promoSet = new PromoSet();
        promoSet.id = this.promoSet?.id;
        promoSet.name = this.form.get('name')?.value;
        promoSet.days = this.form.get('days')?.value;
        promoSet.price = this.form.get('price')?.value;

        return promoSet;
    }
}
