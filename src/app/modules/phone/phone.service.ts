import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhoneVerifyCheckDto } from './models/phone-verify-check.dto';

@Injectable()
export class PhoneService {
    constructor(private http: HttpClient) {}

    requestVerification(): Observable<string> {
        return this.http.post('/phone/verify/request', null, {
            responseType: 'text',
        });
    }

    checkVerification(body: PhoneVerifyCheckDto): Observable<string> {
        return this.http.post('/phone/verify/check', body, {
            responseType: 'text',
        });
    }

    getUserPhone(id: string, productId: string): Observable<string> {
        return this.http.get(`/users/${id}/phone`, {
            responseType: 'text',
            params: { product: productId },
        });
    }
}
