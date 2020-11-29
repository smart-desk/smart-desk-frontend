import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoginComponent } from '../login/login.component';
import { AuthService, UserService } from '../../../../shared/services';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from '../../../../shared/models/dto/user.entity';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    user: User;

    constructor(
        private modalService: NzModalService,
        private userService: UserService,
        private cd: ChangeDetectorRef,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.userService
            .getCurrentUser()
            .pipe(catchError(() => of(null)))
            .subscribe(user => {
                this.user = user;
                this.cd.detectChanges();
            });
    }

    getAvatarLetters(): string {
        return (this.user.firstName[0] || '') + (this.user.lastName[0] || '');
    }

    openLoginModal(): void {
        const modal = this.modalService.create({
            nzTitle: 'Войти на сайт',
            nzContent: LoginComponent,
            nzFooter: null,
        });

        modal.afterClose.pipe(switchMap(() => this.userService.getCurrentUser())).subscribe(user => {
            this.user = user;
            this.cd.detectChanges();
        });
    }

    logout(): void {
        this.user = null;
        this.authService.logout();
        this.cd.detectChanges();
    }
}
