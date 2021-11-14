import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigEntity } from './models/app-config.entity';
import { AppConfigDto } from './models/app-config.dto';

@Injectable()
export class AppConfigService {
    constructor(private http: HttpClient) {}

    getAppConfig(): Observable<AppConfigEntity> {
        return this.http.get<AppConfigEntity>(`/app-config`);
    }

    updateAppConfig(config: AppConfigDto): Observable<AppConfigEntity> {
        return this.http.post<AppConfigEntity>(`/app-config`, config);
    }
}
