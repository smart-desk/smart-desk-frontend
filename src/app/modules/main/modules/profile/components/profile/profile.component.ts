import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../../../services';
import { User } from '../../../../../../models/user/user.entity';
import { ProfileFormEnum } from './profile-form.enum';
import { LoginService } from '../../../../../../services/login/login.service';
import { UpdateUserDto } from '../../../../../../models/user/update-user.dto';
import { PhoneService } from '../../../../../../services/phone/phone.service';
import { PhoneVerifyCheckDto } from '../../../../../../models/phone/phone-verify-check.dto';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormNameComponent } from '../../../../components/form-name/form-name.component';
import { FormVerifyComponent } from '../../../../components/form-verify/form-verify.component';
import { FormPhoneComponent } from '../../../../components/form-phone/form-phone.component';
import { ContentComponent } from '../../../../interfaces/content-component.interface';
import { NotificationsComponent } from '../notifications/notifications.component';
import { Notification } from '../notifications/enums/notification.enum';

@Component({
    selector: 'app-user-settings',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    profile: User;
    verificationRequestId: string;
    not = Notification;

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

    submitForm(data: ContentComponent): void {
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
        const modalRef: NzModalRef = this.modalService.create<FormNameComponent>({
            nzContent: FormNameComponent,
            nzComponentParams: { profile: this.profile },
            nzOnOk: () => modalRef.getContentComponent().submit(),
        });

        modalRef.getContentComponent().submitEvent.subscribe((data: ContentComponent) => this.submitForm(data));
    }

    openFormConfirmPhone() {
        const modalRef: NzModalRef = this.modalService.create<FormVerifyComponent>({
            nzTitle: 'Подтверждение',
            nzContent: FormVerifyComponent,
            nzComponentParams: { confirmMode: false },
            nzOnOk: () => modalRef.getContentComponent().submitForm(),
        });

        modalRef.getContentComponent().requestVerificationEvent.subscribe(() => this.requestVerification(modalRef));

        modalRef.getContentComponent().submitFormEvent.subscribe(() => this.checkVerification(modalRef));
    }

    openFormChangePhone() {
        const modalRef: NzModalRef = this.modalService.create<FormPhoneComponent>({
            nzTitle: 'Телефон',
            nzContent: FormPhoneComponent,
            nzComponentParams: { profile: this.profile },
            nzOnOk: () => modalRef.getContentComponent().submit(() => this.cd.detectChanges()),
        });

        modalRef.getContentComponent().submitFormEvent$.subscribe((data: ContentComponent) => this.submitForm(data));
    }

    requestVerification(modal: NzModalRef<FormVerifyComponent, any>): void {
        modal.getContentComponent().confirmMode = true;
        this.phoneService.requestVerification().subscribe(verificationRequestId => (this.verificationRequestId = verificationRequestId));
    }

    checkVerification(modal: NzModalRef<FormVerifyComponent, any>): void {
        const verificationDto = new PhoneVerifyCheckDto();
        verificationDto.requestId = this.verificationRequestId;
        verificationDto.code = (modal.getContentComponent().formConfirm.get('code') as AbstractControl).value.toString();
        this.phoneService.checkVerification(verificationDto).subscribe();
    }

    setUpNotifications(): void {
        const modalRef: NzModalRef = this.modalService.create<NotificationsComponent>({
            nzTitle: 'Уведомления',
            nzContent: NotificationsComponent,
            nzComponentParams: { profile: this.profile },
            nzOnOk: () => {
                const emailNotifications = modalRef.getContentComponent().getNotificationOption();
                this.userService.updateProfile({ emailNotifications }).subscribe();
            },
        });
    }
}
