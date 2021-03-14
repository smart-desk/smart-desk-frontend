import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/user/user.entity';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ProfileFormEnum } from './profile-form.enum';
import { LoginService } from '../../../../shared/services/login/login.service';
import { UpdateUserDto } from '../../../../shared/models/user/update-user.dto';
import { PhoneService } from '../../../../shared/services/phone/phone.service';
import { PhoneVerifyCheckDto } from '../../../../shared/models/phone/phone-verify-check.dto';
import { FormNameDataInterface } from '../../components/modal-name/form-name-data.interface';

@Component({
    selector: 'app-user-settings',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    formNameData: FormNameDataInterface;
    formPhoneData: string;
    formPhone: FormGroup;
    formConfirm: FormGroup;
    state: OperationState;
    profile: User;
    showName = false;
    showProfile = false;
    showPhone = false;
    showConfirmPhone = false;
    confirmMode = false;
    file: NzUploadFile[] = [];
    verificationRequestId: string;

    constructor(
        private modalService: NzModalService,
        private userService: UserService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private loginService: LoginService,
        private phoneService: PhoneService
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(user => {
            this.profile = user;
            const avatar = this.profile?.avatar;
            this.file = [{ name: 'image.png', uid: '-1', url: avatar }];

            this.cd.detectChanges();
            this.formNameData = {
                profile: {
                    avatar,
                    firstName: this.profile?.firstName,
                    lastName: this.profile?.lastName,
                },
                file: this.file,
            };
            this.formPhoneData = this.profile?.phone.slice(1);
        });
    }

    submitForm(data: { formType: ProfileFormEnum; formValue: void }): void {
        switch (data.formType) {
            case ProfileFormEnum.EMAIL:
                this.updateEmail();
                break;
            case ProfileFormEnum.NAME:
                this.updateName(data.formValue);
                break;
            case ProfileFormEnum.PHONE:
                this.updatePhone(data.formValue);
                break;
            case ProfileFormEnum.CONFIRM:
                this.checkVerification();
                break;
        }
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = [event.file];
            this.formNameData.profile.avatar = this.file[0].response.url;
        }
    }

    updateEmail(): void {
        console.log('updateEmail start');
    }

    updateName(formValue): void {
        this.userService.updateProfile(formValue).subscribe(user => {
            this.profile = user;
            this.loginService.updateLoginInfo();
            this.showProfile = false;
            this.cd.detectChanges();
        });
    }

    updatePhone(phone: void): void {
        const userDto = new UpdateUserDto();
        userDto.phone = (('+' + phone) as unknown) as string;
        this.userService.updateProfile(userDto).subscribe(() => {
            this.showPhone = false;
            this.cd.detectChanges();
        });
    }

    requestVerification(): void {
        this.confirmMode = true;
        this.phoneService.requestVerification().subscribe(verificationRequestId => (this.verificationRequestId = verificationRequestId));
    }

    checkVerification(): void {
        const verificationDto = new PhoneVerifyCheckDto();
        verificationDto.requestId = this.verificationRequestId;
        verificationDto.code = this.formConfirm.get('code').value.toString();
        this.phoneService.checkVerification(verificationDto).subscribe(() => {
            this.showConfirmPhone = !this.showConfirmPhone;
            this.confirmMode = false;
        });
    }
}
