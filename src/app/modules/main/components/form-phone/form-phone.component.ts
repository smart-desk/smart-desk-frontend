import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProfileFormEnum } from '../../modules/profile/components/profile/profile-form.enum';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../../models/user/user.entity';

@Component({
    selector: 'app-form-phone',
    templateUrl: './form-phone.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPhoneComponent implements OnInit {
    @Input() profile: User;
    @Output() submitFormEvent$ = new EventEmitter<{ formType: ProfileFormEnum; value: User }>();
    formPhone: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formPhone = this.fb.group({ phone: [this.profile.phone] });
    }

    submit(): void {
        this.setValue();
        this.submitFormEvent$.emit({ formType: ProfileFormEnum.PHONE, value: this.profile });
    }

    setValue(): void {
        this.profile.phone = (this.formPhone.get('phone') as AbstractControl).value;
    }
}
