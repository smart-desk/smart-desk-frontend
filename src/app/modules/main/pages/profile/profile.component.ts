import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/dto/user.entity';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-user-settings',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
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

    constructor(private modalService: NzModalService, private userService: UserService) {}

    ngOnInit(): void {
        this.formName = new FormGroup({
            fName: new FormControl(this.profile?.firstName),
            lName: new FormControl(this.profile?.lastName),
        });

        this.formEmail = new FormGroup({
            email: new FormControl(this.profile?.email),
        });

        this.formPhone = new FormGroup({
            phone: new FormControl(this.profile?.phone),
        });

        this.formCity = new FormGroup({
            city: new FormControl(this.profile?.city),
        });

        this.userService.getCurrentUser().subscribe(user => {
            this.profile = user;
        });
    }

    submitForm(formType) {
        switch (formType) {
            case formType === 'email':
                this.updateEmail();
                break;
            case formType === 'name':
                this.updateName();
                break;
            case formType === 'phone':
                this.updatePhone();
                break;
        }
    }

    fileChanged(event: NzUploadChangeParam) {
        if (event.type === 'success') {
            this.file = event.file;
        }
    }

    updateEmail() {
        console.log('updateEmail start');
    }
    updateName() {
        console.log('updateName start');
    }
    updatePhone() {
        console.log('updatePhone start');
    }
}
