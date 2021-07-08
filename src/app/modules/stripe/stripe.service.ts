import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StripeService {
    public stripe: Stripe;

    constructor() {
        from(loadStripe(environment.stripePublicKey)).subscribe(stripe => {
            if (stripe) {
                this.stripe = stripe;
            }
        });
    }
}
