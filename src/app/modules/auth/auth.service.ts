import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
    access_token: string;
}

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    googleLogin(token: string): Observable<boolean> {
        return this.http
            .post<LoginResponse>(`/auth/google/login`, { token })
            .pipe(
                map(res => this.handleResponse(res)),
                catchError(err => of(false))
            );
    }

    vkLogin(code: string): Observable<boolean> {
        return this.http.get<LoginResponse>(`/auth/vk/login?code=${code}&host=${environment.host}/vk/redirect`).pipe(
            map(res => this.handleResponse(res)),
            catchError(err => of(false))
        );
    }

    facebookLogin(token: string): Observable<boolean> {
        return this.http
            .post<any>(`/auth/facebook/login`, { token })
            .pipe(
                map(res => this.handleResponse(res)),
                catchError(err => of(false))
            );
    }

    private handleResponse(res: LoginResponse): boolean {
        if (res?.access_token) {
            localStorage.setItem('token', res.access_token);
            return true;
        }
        return false;
    }
}
