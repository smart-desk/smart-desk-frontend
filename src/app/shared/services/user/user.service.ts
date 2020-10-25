import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

// todo replace with generated user interface
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private user: User;

    constructor(private http: HttpClient) {}

    getCurrentUser(): Observable<User> {
        if (this.user) {
            return of(this.user);
        }
        return this.http.get<any>(`/users/profile`).pipe(tap(user => (this.user = user)));
    }

    clearCurrentUser(): void {
        this.user = null;
    }
}
