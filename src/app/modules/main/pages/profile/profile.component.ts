import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/dto/user/user.entity';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ProfileFormEnum } from './profile-form.enum';
import { LoginService } from '../../../../shared/services/login/login.service';

@Component({
    selector: 'app-user-settings',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    formName: FormGroup;
    formPhone: FormGroup;
    formConfirm: FormGroup;
    formCity: FormGroup;
    isConfirmPhone = false;
    state: OperationState;
    profile: User;
    showProfile = false;
    showPhone = false;
    showCity = false;
    showConfirmPhone = false;
    confirmMode = false;
    file: NzUploadFile[] = [];
    profileForm = ProfileFormEnum;
    verifyId: string;

    constructor(
        private modalService: NzModalService,
        private userService: UserService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        this.formName = this.fb.group({
            firstName: [],
            lastName: [],
            avatar: [],
        });
        this.formPhone = this.fb.group({ phone: [] });
        this.formConfirm = this.fb.group({ code: [] });
        this.formCity = this.fb.group({ city: [] });

        this.userService.getCurrentUser().subscribe(user => {
            this.profile = user;
            const avatar = this.profile?.avatar;
            this.file = [{ name: 'image.png', uid: '-1', url: avatar }];

            this.cd.detectChanges();
            this.formName.get('firstName').setValue(this.profile?.firstName);
            this.formName.get('lastName').setValue(this.profile?.lastName);
            this.formName.get('avatar').setValue(avatar);
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
            case ProfileFormEnum.CONFIRM:
                this.confirmPhone();
                break;
        }
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = [event.file];
            this.formName.get('avatar').setValue(this.file[0].response.url);
        }
    }

    confirmPhone(): void {
        this.userService.confirmPhone(this.formConfirm.value.code, this.verifyId).subscribe(() => this.closeConfirmForm());
        // todo: разрулить ответ
    }

    updateEmail(): void {
        console.log('updateEmail start');
    }

    updateName(): void {
        this.userService.updateProfile(this.formName.value).subscribe(user => {
            this.profile = user;
            this.loginService.updateLoginInfo();
            this.showProfile = false;
            this.cd.detectChanges();
        });
    }

    updatePhone(): void {
        this.userService.changePhone(this.formPhone.value).subscribe(() => {
            this.showPhone = false;
            this.cd.detectChanges();
        });
    }

    verify(): void {
        this.confirmMode = true;
        this.userService.verifyPhone().subscribe(verifyId => (this.verifyId = verifyId));
    }

    closeConfirmForm(): void {
        this.showConfirmPhone = !this.showConfirmPhone;
        this.confirmMode = false;
    }
}
