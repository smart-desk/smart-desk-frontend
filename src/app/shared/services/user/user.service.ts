import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    // todo generate user model class
    getProfile(): Observable<any> {
        return this.http.get<any>(`/users/profile`);
    }
}
