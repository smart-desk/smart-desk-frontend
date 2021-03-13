import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhoneVerifyCheckDto } from '../../models/dto/phone/phone-verify-check.dto';

@Injectable()
export class PhoneService {
    constructor(private http: HttpClient) {}

    verifyPhone(): Observable<string> {
        return this.http.post<string>('/phone/verify/request', null);
    }

    confirmPhone(body: PhoneVerifyCheckDto): Observable<string> {
        return this.http.post<string>('/phone/verify/check', body);
    }
}
