import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../modules/user/models/user.entity';
import { UserService } from '../../modules';

@Component({
    selector: 'app-admin',
    styleUrls: ['./admin.component.scss'],
    templateUrl: './admin.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
    user: User;

    constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.userService.getCurrentUser().subscribe(user => {
            this.user = user;
            this.cdr.detectChanges();
        });
    }
}
