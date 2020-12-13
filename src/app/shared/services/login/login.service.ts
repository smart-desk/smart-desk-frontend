import { Injectable } from '@angular/core';
import { User } from '../../models/dto/user.entity';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginComponent } from '../../components/login/login.component';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '..';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private login = new BehaviorSubject<User>(undefined);

    constructor(private userService: UserService, private modalService: NzModalService) {}

    openLoginModal() {
        this.openModal().subscribe(user => this.login.next(user));
    }

    get login$() {
        return this.login.asObservable();
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
