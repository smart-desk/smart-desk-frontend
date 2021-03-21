import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileFormEnum } from '../../pages/profile/profile-form.enum';

@Component({
    selector: 'app-form-verify',
    templateUrl: './form-verify.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormVerifyComponent implements OnInit, OnChanges {
    @Input() confirmMode = false;
    @Output() submitFormEvent$ = new EventEmitter<{ formType: ProfileFormEnum; formValue: void }>();
    @Output() requestVerificationEvent$ = new EventEmitter<void>();
    formConfirm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formConfirm = this.fb.group({ code: [] });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.confirmMode) {
            this.confirmMode = changes.confirmMode?.currentValue;
        }
    }

    submitForm(): void {
        this.submitFormEvent$.emit({ formType: ProfileFormEnum.CONFIRM, formValue: this.formConfirm.value });
    }

    requestVerification(): void {
        this.requestVerificationEvent$.emit();
    }
}
