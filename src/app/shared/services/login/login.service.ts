import { Injectable } from '@angular/core';
import { User } from '../../models/user/user.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginComponent } from '../../components/login/login.component';
import { switchMap } from 'rxjs/operators';
import { UserService } from '..';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private login = new BehaviorSubject<User>(undefined);
    constructor(private userService: UserService, private modalService: NzModalService) {
        this.userService.getCurrentUser().subscribe(user => this.login.next(user));
    }

    openLoginModal(): void {
        this.openModal().subscribe(user => this.login.next(user));
    }

    updateLoginInfo(): void {
        this.userService.getCurrentUser(true).subscribe(user => this.login.next(user));
    }

    get login$(): Observable<User> {
        return this.login.asObservable();
    }

    logout(): void {
        localStorage.removeItem('token');
        this.userService.clearCurrentUser();
        this.login.next(undefined);
    }

    openModal(): Observable<User> {
        const modal = this.modalService.create({
            nzTitle: 'Войти на сайт',
            nzContent: LoginComponent,
            nzFooter: null,
        });
        return modal.afterClose.pipe(switchMap(() => this.userService.getCurrentUser()));
    }
}
