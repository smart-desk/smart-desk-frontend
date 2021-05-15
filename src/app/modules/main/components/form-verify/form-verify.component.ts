import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileFormEnum } from '../../modules/profile/components/profile/profile-form.enum';

@Component({
    selector: 'app-form-verify',
    templateUrl: './form-verify.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormVerifyComponent implements OnInit {
    @Input() confirmMode = false;
    @Output() submitFormEvent = new EventEmitter<{ formType: ProfileFormEnum; formValue: void }>();
    @Output() requestVerificationEvent = new EventEmitter<void>();
    formConfirm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formConfirm = this.fb.group({ code: [] });
    }

    submitForm(): void {
        this.submitFormEvent.emit({ formType: ProfileFormEnum.VERIFY, formValue: this.formConfirm.value });
    }

    requestVerification(): void {
        this.requestVerificationEvent.emit();
    }
}
