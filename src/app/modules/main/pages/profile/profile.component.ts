import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/user/user.entity';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ProfileFormEnum } from './profile-form.enum';
import { LoginService } from '../../../../shared/services/login/login.service';
import { UpdateUserDto } from '../../../../shared/models/user/update-user.dto';
import { PhoneService } from '../../../../shared/services/phone/phone.service';
import { PhoneVerifyCheckDto } from '../../../../shared/models/phone/phone-verify-check.dto';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-user-settings',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
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
    verificationRequestId: string;
    submitFormName$ = new Subject<void>();

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

            this.cd.detectChanges();
            this.formPhoneData = this.profile?.phone.slice(1);
        });
    }

    submitForm(data: { formType: ProfileFormEnum; value: UpdateUserDto }): void {
        switch (data.formType) {
            case ProfileFormEnum.NAME:
                this.updateName(data.value);
                break;
            case ProfileFormEnum.PHONE:
                this.updatePhone(data.value);
                break;
            case ProfileFormEnum.CONFIRM:
                this.checkVerification();
                break;
        }
    }

    updateName(profile): void {
        this.userService.updateProfile(profile).subscribe(user => {
            this.profile = user;
            this.loginService.updateLoginInfo();
            this.showProfile = false;
            this.cd.detectChanges();
        });
    }

    updatePhone(phone: UpdateUserDto): void {
        const userDto = new UpdateUserDto();
        userDto.phone = '+' + phone;
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

    submitFormName() {
        this.submitFormName$.next();
    }
}
