import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

export interface LoginResponse {
    access_token: string;
}

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private userService: UserService) {}

    login(type: 'google' | 'facebook', googleIdToken: string): Observable<LoginResponse> {
        return this.http.post<any>(`/auth/${type}/login`, {
            token: googleIdToken,
        });
    }
}
