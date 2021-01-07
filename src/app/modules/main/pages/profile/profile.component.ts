import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/dto/user/user.entity';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ProfileFormEnum } from './profile-form.enum';

@Component({
    selector: 'app-user-settings',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    formName: FormGroup;
    formPhone: FormGroup;
    formCity: FormGroup;
    state: OperationState;
    profile: User;
    showProfile = false;
    showPhone = false;
    showCity = false;
    file: NzUploadFile[];
    profileForm = ProfileFormEnum;

    constructor(
        private modalService: NzModalService,
        private userService: UserService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.formName = this.fb.group({
            firstName: [],
            lastName: [],
        });
        this.formPhone = this.fb.group({ phone: [] });
        this.formCity = this.fb.group({ city: [] });

        this.userService.getCurrentUser().subscribe(user => {
            this.profile = user;
            this.cd.detectChanges();

            this.formName.get('firstName').setValue(this.profile?.firstName);
            this.formName.get('lastName').setValue(this.profile?.lastName);
            this.formPhone.get('phone').setValue(this.profile?.phone);
            this.formCity.get('city').setValue(this.profile?.city);
        });
    }

    submitForm(formType): void {
        switch (formType) {
            case ProfileFormEnum.EMAIL:
                this.updateEmail();
                break;
            case ProfileFormEnum.NAME:
                this.updateName();
                break;
            case ProfileFormEnum.PHONE:
                this.updatePhone();
                break;
        }
    }

    fileChanged(event: NzUploadChangeParam) {
        if (event.type === 'success') {
            this.file = [event.file];
        }
    }

    updateEmail(): void {
        console.log('updateEmail start');
    }

    updateName(): void {
        this.userService.updateProfile(this.formName.value).subscribe(user => {
            this.profile = user;
            this.cd.detectChanges();
        });
    }

    updatePhone(): void {
        console.log('updatePhone start');
    }
}
