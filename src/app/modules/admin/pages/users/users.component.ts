import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/dto/user/user.entity';
import { combineLatest } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RolesEnum } from '../../../../shared/services/auth/user-roles.enum';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
    rolesArray = Object.values(RolesEnum).filter(r => r !== RolesEnum.VIEWER);
    showRolesForm = false;
    rolesForm: FormGroup;
    users: User[];
    constructor(private userService: UserService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
        this.rolesForm = this.fb.group({
            roles: this.fb.array(this.rolesArray.map(r => false)),
        });
    }

    ngOnInit(): void {
        combineLatest([this.userService.getUsers(), this.userService.getCurrentUser()]).subscribe(([users, currentUser]) => {
            this.users = users.filter(user => user.id !== currentUser.id);
            this.updateRolesForm();
            this.cdr.detectChanges();
        });
    }

    get roles(): FormArray {
        return this.rolesForm.get('roles') as FormArray;
    }

    // todo pass user to context
    // todo make modal as separated component
    private updateRolesForm(user?: User): void {
        this.rolesForm.patchValue(
            {
                roles: this.rolesArray.map(r => false),
            },
            { onlySelf: true }
        );
    }
}
