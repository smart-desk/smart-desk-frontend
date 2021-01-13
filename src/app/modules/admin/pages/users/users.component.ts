import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/dto/user/user.entity';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
    users: User[];
    constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        combineLatest([this.userService.getUsers(), this.userService.getCurrentUser()]).subscribe(([users, currentUser]) => {
            this.users = users.filter(user => user.id !== currentUser.id);
            this.cdr.detectChanges();
        });
    }
}
