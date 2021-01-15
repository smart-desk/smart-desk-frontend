import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/dto/user/user.entity';
import { UpdateUserDto } from '../../models/dto/user/update-user.dto';
import { UpdateUserRolesDto } from '../../models/dto/user/update-user-roles.dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private user: User;

    constructor(private http: HttpClient) {}

    getCurrentUser(forceUpdate?: boolean): Observable<User> {
        if (this.user && !forceUpdate) {
            return of(this.user);
        }
        return this.http.get<any>(`/users/profile`).pipe(tap(user => (this.user = user)));
    }

    clearCurrentUser(): void {
        this.user = null;
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(`/users/${id}`);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`/users`);
    }

    updateProfile(profile: UpdateUserDto): Observable<User> {
        return this.http.patch<User>('/users/profile', profile);
    }

    updateUserRoles(id: string, body: UpdateUserRolesDto): Observable<User> {
        return this.http.patch<User>(`/users/${id}/roles`, body);
    }
}
