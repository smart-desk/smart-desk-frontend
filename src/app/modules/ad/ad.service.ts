import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdConfigEntity } from './models/ad-config.entity';
import { AdConfigDto } from './models/ad-config.dto';
import { AdCampaignDto } from './models/ad-campaign.dto';
import { AdCampaignEntity, AdCampaignType } from './models/ad-campaign.entity';
import { StripeSession } from '../stripe/models/stripe-session.interface';
import { AdCampaignCurrentDto } from './models/ad-campaign-current.dto';

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

    updateAdCampaign(adCampaign: AdCampaignEntity): Observable<AdCampaignEntity> {
        return this.http.patch<AdCampaignEntity>(`/ad/campaigns/${adCampaign.id}`, adCampaign);
    }

    getAdCampaigns(status?: string): Observable<AdCampaignEntity[]> {
        const request = status ? `/ad/campaigns?status=${status}` : `/ad/campaigns`;
        return this.http.get<AdCampaignEntity[]>(request);
    }

    getAdCampaign(id: string): Observable<AdCampaignEntity> {
        return this.http.get<AdCampaignEntity>(`/ad/campaigns/${id}`);
    }

    getAdCampaignsSchedule(type: AdCampaignType): Observable<any> {
        return this.http.get<any>(`/ad/campaigns/schedule?type=${type}`);
    }

    getAdCampaignsCurrent(type: AdCampaignType): Observable<AdCampaignCurrentDto> {
        return this.http.get<AdCampaignCurrentDto>(`/ad/campaigns/current?type=${type}`);
    }

    rejectAdCampaigns(id: string, body: { reason: string }): Observable<AdCampaignEntity> {
        return this.http.patch<AdCampaignEntity>(`/ad/campaigns/${id}/reject`, body);
    }

    approveAdCampaigns(id: string): Observable<AdCampaignEntity> {
        return this.http.patch<AdCampaignEntity>(`/ad/campaigns/${id}/approve`, null);
    }

    deleteAdCampaign(id: string): Observable<void> {
        return this.http.delete<void>(`/ad/campaigns/${id}`);
    }
}
