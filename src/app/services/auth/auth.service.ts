import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface LoginResponse {
    access_token: string;
}

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    login(type: 'google' | 'facebook' | 'vk', token: string): Observable<LoginResponse> {
        return this.http.post<any>(`/auth/${type}/login`, {
            token,
        });
    }
}
