import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../../modules';
import { User } from '../../../../modules/user/models/user.entity';
import { combineLatest } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RolesFormComponent } from '../../components/roles-form/roles-form.component';
import { UserStatus } from '../../../../modules/user/models/user-status.enum';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
    userStatus = UserStatus;
    users: User[];
    constructor(private userService: UserService, private cdr: ChangeDetectorRef, private modalService: NzModalService) {}

    ngOnInit(): void {
        combineLatest([this.userService.getUsers(), this.userService.getCurrentUser()]).subscribe(([users, currentUser]) => {
            this.users = users.filter(user => user.id !== currentUser.id);
            this.cdr.detectChanges();
        });
    }

    updateUserRoles(user: User): void {
        this.modalService.create({
            nzTitle: 'Изменить роль пользователя',
            nzContent: RolesFormComponent,
            nzComponentParams: { user },
            nzFooter: null,
        });
    }

    blockUser(user: User, value: boolean): void {
        this.userService.blockUser(user.id, { value }).subscribe(res => {
            user.status = res.status;
            user.roles = res.roles;
            this.cdr.detectChanges();
        });
    }
}
