import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../shared/services';
import { User } from '../../../shared/models/user/user.entity';
import { ProfileFormEnum } from './profile-form.enum';
import { LoginService } from '../../../shared/services/login/login.service';
import { UpdateUserDto } from '../../../shared/models/user/update-user.dto';
import { PhoneService } from '../../../shared/services/phone/phone.service';
import { PhoneVerifyCheckDto } from '../../../shared/models/phone/phone-verify-check.dto';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormNameComponent } from '../../components/form-name/form-name.component';
import { FormVerifyComponent } from '../../components/form-verify/form-verify.component';
import { FormPhoneComponent } from '../../components/form-phone/form-phone.component';

@Component({
    selector: 'app-user-settings',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    profile: User;
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
            this.cd.detectChanges();
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
        }
    }

    updateName(profile: UpdateUserDto): void {
        this.userService.updateProfile(profile).subscribe(user => {
            this.profile = user;
            this.loginService.updateLoginInfo();
            this.cd.detectChanges();
        });
    }

    updatePhone(profile: UpdateUserDto): void {
        this.userService.updateProfile(profile).subscribe(() => {
            this.cd.detectChanges();
        });
    }

    openFormName() {
        const modalRef = this.modalService.create<FormNameComponent>({
            nzContent: FormNameComponent,
            nzComponentParams: { profile: this.profile },
            nzOnOk: () => modalRef.getContentComponent().submit(),
        });

        modalRef.getContentComponent().submitEvent.subscribe(data => this.submitForm(data));
    }

    openFormConfirmPhone() {
        const modalRef = this.modalService.create<FormVerifyComponent>({
            nzTitle: 'Подтверждение',
            nzContent: FormVerifyComponent,
            nzComponentParams: { confirmMode: false },
            nzOnOk: () => modalRef.getContentComponent().submitForm(),
        });

        modalRef.getContentComponent().requestVerificationEvent.subscribe(() => this.requestVerification(modalRef));

        modalRef.getContentComponent().submitFormEvent.subscribe(() => this.checkVerification(modalRef));
    }

    openFormChangePhone() {
        const modalRef = this.modalService.create<FormPhoneComponent>({
            nzTitle: 'Телефон',
            nzContent: FormPhoneComponent,
            nzComponentParams: { profile: this.profile },
            nzOnOk: () => modalRef.getContentComponent().submit(() => this.cd.detectChanges()),
        });

        modalRef.getContentComponent().submitFormEvent$.subscribe(data => this.submitForm(data));
    }

    requestVerification(modal: NzModalRef<FormVerifyComponent, any>): void {
        modal.getContentComponent().confirmMode = true;
        this.phoneService.requestVerification().subscribe(verificationRequestId => (this.verificationRequestId = verificationRequestId));
    }

    checkVerification(modal: NzModalRef<FormVerifyComponent, any>): void {
        const verificationDto = new PhoneVerifyCheckDto();
        verificationDto.requestId = this.verificationRequestId;
        verificationDto.code = modal.getContentComponent().formConfirm.get('code').value.toString();
        this.phoneService.checkVerification(verificationDto).subscribe();
    }
}
