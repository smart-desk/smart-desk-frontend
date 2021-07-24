import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromoSet } from './models/promo-set.entity';
import { PromoSetDto } from './models/promo-set.dto';
import { PayPromoSetDto } from './models/pay-promo-set.dto';
import { StripeSession } from '../stripe/models/stripe-session.interface';
import { Product } from '../product/models/product.entity';

@Injectable({
    providedIn: 'root',
})
export class PromoService {
    constructor(private http: HttpClient) {}

    getPromoSets(): Observable<PromoSet[]> {
        return this.http.get<PromoSet[]>('/promo-set');
    }

    updatePromoSet(id: string, body: PromoSetDto): Observable<PromoSet> {
        return this.http.patch<PromoSet>(`/promo-set/${id}`, body);
    }

    createPromoSet(body: PromoSetDto): Observable<PromoSet> {
        return this.http.post<PromoSet>('/promo-set', body);
    }

    deletePromoSet(id: string): Observable<void> {
        return this.http.delete<void>(`/promo-set/${id}`);
    }

    payPromo(body: PayPromoSetDto): Observable<StripeSession> {
        return this.http.post<StripeSession>('/promo', body);
    }

    getPromoProducts(categoryId: string): Observable<Product[]> {
        return this.http.get<Product[]>(`/promo/${categoryId}/products`);
    }
}
