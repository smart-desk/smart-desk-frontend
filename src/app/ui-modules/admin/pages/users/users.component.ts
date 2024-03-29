import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../../modules/user/models/user.entity';
import { combineLatest } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RolesFormComponent } from '../../components/roles-form/roles-form.component';
import { UserStatus } from '../../../../modules/user/models/user-status.enum';
import { UserService } from '../../../../modules/user/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
    userStatus = UserStatus;
    users: User[];
    currentUserId: string;
    searchValue = '';
    isVisibleFilter = false;

    constructor(private userService: UserService, private cdr: ChangeDetectorRef, private modalService: NzModalService) {}

    ngOnInit(): void {
        combineLatest([this.userService.getUsers(), this.userService.getCurrentUser()]).subscribe(([users, currentUser]) => {
            this.users = users;
            this.currentUserId = currentUser.id;
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

    reset(): void {
        this.searchValue = '';
        this.search();
    }

    search(): void {
        this.isVisibleFilter = false;
        this.userService.getUsers().subscribe(users => {
            if (this.searchValue) {
                this.users = users.filter(user => this.searchInUser(user));
            } else {
                this.users = users;
            }
            this.cdr.detectChanges();
        });
    }

    private searchInUser(user: User): boolean {
        return `${user.firstName} ${user.lastName} ${user.id}`.includes(this.searchValue);
    }
}
