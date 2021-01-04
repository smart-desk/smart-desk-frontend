import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/dto/user.entity';
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
    formEmail: FormGroup;
    formPhone: FormGroup;
    formCity: FormGroup;
    state: OperationState;
    profile: User;
    showProfile = false;
    showPhone = false;
    showCity = false;
    file: NzUploadFile;
    profileForm = ProfileFormEnum;

    constructor(
        private modalService: NzModalService,
        private userService: UserService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(user => {
            this.profile = user;
            this.cd.detectChanges();
        });

        this.formName = this.fb.group({
            fName: [this.profile?.firstName || null],
            lName: [this.profile?.lastName || null],
        });

        this.formEmail = this.fb.group({
            email: [this.profile?.email || null],
        });

        this.formPhone = this.fb.group({
            phone: [this.profile?.phone || null],
        });

        this.formCity = this.fb.group({
            city: [this.profile?.city || null],
        });
    }

    submitForm(formType): void {
        // TODO: разобраться почему не попадает в нужный кейс
        switch (formType) {
            case formType === ProfileFormEnum.EMAIL:
                this.updateEmail();
                break;
            case formType === ProfileFormEnum.NAME:
                this.updateName();
                break;
            case formType === ProfileFormEnum.PHONE:
                this.updatePhone();
                break;
        }
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = event.file;
        }
    }

    updateEmail(): void {
        console.log('updateEmail start');
    }
    updateName(): void {
        console.log('updateName start');
    }
    updatePhone(): void {
        console.log('updatePhone start');
    }
}
