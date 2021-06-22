import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdConfigDto } from './models/ad-config-dto.interface';

interface StripeSession {
    id: string;
}

@Injectable()
export class AdCampaignService {
    constructor(private http: HttpClient) {}

    payCampaign(id: string): Observable<string> {
        return this.http.post<StripeSession>(`/ad/campaigns/${id}/pay`, {}).pipe(map(res => res.id));
    }

    getAdSetup(): Observable<AdConfigDto> {
        return this.http.get<AdConfigDto>(`/ad/config`);
    }

    postAdSetup(dataAd: AdConfigDto): Observable<AdConfigDto> {
        return this.http.post<AdConfigDto>(`/ad/config`, dataAd);
    }
}
