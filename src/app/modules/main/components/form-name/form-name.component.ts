import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ProfileFormEnum } from '../../modules/profile/components/profile/profile-form.enum';
import { User } from '../../../../models/user/user.entity';

@Component({
    selector: 'app-modal-name',
    templateUrl: './form-name.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormNameComponent implements OnInit {
    @Input() profile: User;
    @Output() submitEvent = new EventEmitter<{ formType: ProfileFormEnum; value: User }>();
    file: NzUploadFile[] = [];
    formName: FormGroup;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.formName = this.fb.group({
            firstName: [this.profile.firstName],
            lastName: [this.profile.lastName],
            avatar: [this.profile.avatar],
        });

        const avatar = this.profile?.avatar;
        this.file = [{ uid: '-1', name: 'image.png', url: avatar }];
        this.cd.detectChanges();
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = [event.file];
            const fileUrl = this.file[0].response.url;
            this.profile.avatar = fileUrl;
            (this.formName.get('avatar') as AbstractControl).setValue(fileUrl);
        }
    }

    submit(): void {
        this.setValue();
        this.submitEvent.emit({ formType: ProfileFormEnum.NAME, value: this.profile });
    }

    setValue(): void {
        this.profile.lastName = (this.formName.get('lastName') as AbstractControl).value;
        this.profile.firstName = (this.formName.get('firstName') as AbstractControl).value;
        this.profile.avatar = (this.formName.get('avatar') as AbstractControl).value;
    }
}
