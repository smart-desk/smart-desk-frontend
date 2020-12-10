import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { catchError, map } from 'rxjs/operators';

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

    logout(): void {
        localStorage.removeItem('token');
        this.userService.clearCurrentUser();
    }

    isLoggedIn(): Observable<boolean> {
        return this.userService.getCurrentUser().pipe(
            map(user => !!user),
            catchError(() => of(false))
        );
    }
}
