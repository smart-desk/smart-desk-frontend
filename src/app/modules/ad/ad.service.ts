import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StripeSession } from './models/stripe-session.interface';
import { AdConfigEntity } from './models/ad-config.entity';
import { AdConfigDto } from './models/ad-config.dto';

@Injectable()
export class AdService {
    constructor(private http: HttpClient) {}

    payCampaign(id: string): Observable<string> {
        return this.http.post<StripeSession>(`/ad/campaigns/${id}/pay`, {}).pipe(map(res => res.id));
    }

    getAdConfig(): Observable<AdConfigEntity> {
        return this.http.get<AdConfigEntity>(`/ad/config`);
    }

    updateAdConfig(config: AdConfigDto): Observable<AdConfigEntity> {
        return this.http.post<AdConfigEntity>(`/ad/config`, config);
    }
}
