import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    login(type: 'google' | 'facebook', token: string): Observable<any> {
        return this.http.post<any>(`/auth/${type}/login`, {
            token,
        });
    }
}
