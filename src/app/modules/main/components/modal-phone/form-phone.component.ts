import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProfileFormEnum } from '../../pages/profile/profile-form.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../../shared/models/user/user.entity';

@Component({
    selector: 'app-form-phone',
    templateUrl: './form-phone.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPhoneComponent implements OnInit, OnChanges {
    @Input() profile: User;
    @Output() submitFormEvent$ = new EventEmitter<{ formType: ProfileFormEnum; value: User }>();
    formPhone: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.formPhone && changes.profile?.currentValue) {
            this.profile = changes.profile?.currentValue;
        }
    }

    ngOnInit(): void {
        this.formPhone = this.fb.group({ phone: [this.profile.phone] });
    }

    submit(): void {
        this.setValue();
        this.submitFormEvent$.emit({ formType: ProfileFormEnum.PHONE, value: this.profile });
    }

    setValue(): void {
        this.profile.phone = this.formPhone.get('phone').value;
    }
}
