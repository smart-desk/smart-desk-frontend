import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { User } from '../../../../../../modules/user/models/user.entity';
import { ProfileFormEnum } from './profile-form.enum';
import { LoginService } from '../../../../../../modules/login/login.service';
import { UpdateUserDto } from '../../../../../../modules/user/models/update-user.dto';
import { PhoneService } from '../../../../../../modules/phone/phone.service';
import { PhoneVerifyCheckDto } from '../../../../../../modules/phone/models/phone-verify-check.dto';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormNameComponent } from '../../../../components/form-name/form-name.component';
import { FormVerifyComponent } from '../../../../components/form-verify/form-verify.component';
import { FormPhoneComponent } from '../../../../components/form-phone/form-phone.component';
import { ContentComponent } from '../../../../interfaces/content-component.interface';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { UserService } from '../../../../../../modules/user/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from '@angular/common/http';
import { BreadcrumbsStep } from '../../../../components/breadcrumb/breadcrumbs.component';

@Component({
    selector: 'app-user-settings',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
    profile: User | undefined;
    verificationRequestId: string;
    breadcrumbs: BreadcrumbsStep[] = [{ name: 'Профиль', navigateUrl: ['/profile'] }];
    private destroy$ = new Subject();

    constructor(
        private modalService: NzModalService,
        private userService: UserService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private loginService: LoginService,
        private phoneService: PhoneService,
        private notificationService: NzNotificationService
    ) {}

    ngOnInit(): void {
        this.loginService.login$.subscribe(user => {
            this.profile = user;
            this.cd.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
        this.userService.updateProfile(profile).subscribe(user => {
            this.profile = user;
            this.cd.detectChanges();
        });
    }

    openFormName(): void {
        const modalRef: NzModalRef = this.modalService.create<FormNameComponent>({
            nzContent: FormNameComponent,
            nzComponentParams: { profile: this.profile },
            nzOnOk: () => modalRef.getContentComponent().submit(),
        });

        modalRef.getContentComponent().submitEvent.subscribe((data: ContentComponent) => this.submitForm(data));
    }

    openFormConfirmPhone(): void {
        const modalRef: NzModalRef = this.modalService.create<FormVerifyComponent>({
            nzTitle: 'Подтверждение',
            nzContent: FormVerifyComponent,
            nzComponentParams: { confirmMode: false },
            nzOnOk: () => modalRef.getContentComponent().submitForm(),
        });

        modalRef.getContentComponent().requestVerificationEvent.subscribe(() => this.requestVerification(modalRef));

        modalRef.getContentComponent().submitFormEvent.subscribe(() => this.checkVerification(modalRef));
    }

    openFormChangePhone(): void {
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
        this.phoneService
            .checkVerification(verificationDto)
            .pipe(
                catchError((res: HttpErrorResponse) => {
                    const errorInfo = JSON.parse(res.error);
                    if (errorInfo.message === 'Code is not correct') {
                        this.notificationService.error('Подтверждение номера телефона', 'Вы ввели неверный код');
                    } else {
                        this.notificationService.error('Подтверждение номера телефона', 'Что-то пошло не так');
                    }
                    return EMPTY;
                }),
                switchMap(() => this.userService.getCurrentUser(true))
            )
            .subscribe(user => {
                this.profile = user;
                this.cd.detectChanges();
            });
    }

    setUpNotifications(): void {
        const modalRef: NzModalRef = this.modalService.create<NotificationsComponent>({
            nzTitle: 'Уведомления',
            nzContent: NotificationsComponent,
            nzComponentParams: { profile: this.profile },
            nzOnOk: () => {
                const emailNotifications = modalRef.getContentComponent().getNotificationOption();
                this.userService
                    .updateProfile({ emailNotifications })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => this.loginService.updateLoginInfo());
            },
        });
    }
}
