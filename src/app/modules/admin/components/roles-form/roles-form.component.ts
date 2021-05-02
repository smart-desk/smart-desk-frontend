import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { RolesEnum } from '../../../shared/models/user/user-roles.enum';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../shared/models/user/user.entity';
import { UserService } from '../../../shared/services';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-roles-form',
    templateUrl: './roles-form.component.html',
    styleUrls: ['./roles-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesFormComponent implements OnInit {
    @Input()
    user: User;

    rolesEnum = RolesEnum;
    rolesArray = Object.values(RolesEnum as object).filter(r => r !== RolesEnum.VIEWER) as string[];
    rolesForm: FormGroup;

    constructor(private fb: FormBuilder, private userService: UserService, private modalRef: NzModalRef) {
        this.rolesForm = this.fb.group({
            roles: this.fb.array(this.rolesArray.map(() => false)),
        });
    }

    get roles(): FormArray {
        return this.rolesForm.get('roles') as FormArray;
    }

    ngOnInit(): void {
        this.roles.patchValue(this.rolesArray.map(r => this.user.roles.includes(r)));
    }

    update(): void {
        const values: string[] = this.roles.value;
        const resultArray = this.rolesArray.filter((r, i) => values[i]);
        if (isEqual(this.user.roles, resultArray)) {
            this.modalRef.close();
            return;
        }

        this.userService.updateUserRoles(this.user.id, { roles: resultArray as RolesEnum[] }).subscribe(() => {
            this.modalRef.close();
        });
    }
}
