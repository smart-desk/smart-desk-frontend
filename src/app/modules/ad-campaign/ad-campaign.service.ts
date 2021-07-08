import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdConfigDto } from './models/ad-config-dto.interface';
import { StripeSession } from '../stripe/models/stripe-session.interface';

@Injectable()
export class AdService {
    constructor(private http: HttpClient) {}

    payCampaign(id: string): Observable<string> {
        return this.http.post<StripeSession>(`/ad/campaigns/${id}/pay`, {}).pipe(map(res => res.id));
    }

    getAdConfig(): Observable<AdConfigDto> {
        return this.http.get<AdConfigDto>(`/ad/config`);
    }

    updateAdConfig(config: AdConfigDto): Observable<AdConfigDto> {
        return this.http.post<AdConfigDto>(`/ad/config`, config);
    }
}
