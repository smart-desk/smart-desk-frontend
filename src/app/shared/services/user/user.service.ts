import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/dto/user.entity';

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
