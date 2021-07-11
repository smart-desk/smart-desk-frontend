import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StripeSession } from './models/stripe-session.interface';
import { AdConfigEntity } from './models/ad-config.entity';
import { AdConfigDto } from './models/ad-config.dto';
import { AdCampaignDto } from './models/ad-campaign.dto';
import { AdCampaignEntity } from './models/ad-campaign.entity';

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

    createAdCampaign(adCampaign: AdCampaignDto): Observable<AdCampaignEntity> {
        return this.http.post<AdCampaignEntity>(`/ad/campaigns`, adCampaign);
    }

    getAdCampaigns(status?: string): Observable<AdCampaignEntity[]> {
        const request = status ? `/ad/campaigns?status=${status}` : `/ad/campaigns`;
        return this.http.get<AdCampaignEntity[]>(request);
    }

    rejectAdCampaigns(id: string, body: { reason: string }): Observable<AdCampaignEntity> {
        return this.http.patch<AdCampaignEntity>(`/ad/campaigns/${id}/reject`, body);
    }

    approveAdCampaigns(id: string): Observable<AdCampaignEntity> {
        return this.http.patch<AdCampaignEntity>(`/ad/campaigns/${id}/approve`, null);
    }
}
