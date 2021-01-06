import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/dto/user/user.entity';
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
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        this.loginService.login$.subscribe(user => {
            this.user = user;
            this.cd.detectChanges();
        });
    }

    getAvatarLetters(): string {
        return (this.user.firstName[0] || '') + (this.user.lastName[0] || '');
    }

    logout(): void {
        this.loginService.logout();
    }

    openLoginModal(): void {
        this.loginService.openLoginModal();
    }
}
