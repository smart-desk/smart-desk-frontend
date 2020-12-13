import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService, UserService } from '../../../../shared/services';
import { catchError } from 'rxjs/operators';
import { User } from '../../../../shared/models/dto/user.entity';
import { LoginService } from '../../../../shared/services/login/login.service';

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
        private authService: AuthService,
        public loginService: LoginService
    ) {}

    ngOnInit(): void {
        this.userService
            .getCurrentUser()
            .pipe(catchError(() => of(null)))
            .subscribe(user => {
                this.user = user;
                this.cd.detectChanges();
            });

        this.loginService.login$.subscribe(user => {
            this.user = user;
            this.cd.detectChanges();
        });
    }

    getAvatarLetters(): string {
        return (this.user.firstName[0] || '') + (this.user.lastName[0] || '');
    }

    logout(): void {
        this.user = null;
        this.authService.logout();
        this.cd.detectChanges();
    }
}
