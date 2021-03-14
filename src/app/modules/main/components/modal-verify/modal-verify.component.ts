import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileFormEnum } from '../../pages/profile/profile-form.enum';
import { FormNameDataInterface } from '../modal-name/form-name-data.interface';

@Component({
    selector: 'app-modal-verify',
    templateUrl: './modal-verify.component.html',
})
export class ModalVerifyComponent implements OnInit, OnChanges {
    @Input() formConfirmData: FormNameDataInterface;
    @Input() showConfirmPhone = false;
    @Input() confirmMode = false;
    @Output() submitFormEvent = new EventEmitter<{ formType: ProfileFormEnum; formValue: void }>();
    @Output() requestVerificationEvent = new EventEmitter<void>();
    formConfirm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formConfirm = this.fb.group({ code: [] });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.showConfirmPhone) {
            this.showConfirmPhone = changes.showConfirmPhone?.currentValue;
        }
        if (changes.confirmMode) {
            this.confirmMode = changes.confirmMode?.currentValue;
        }
    }

    submitForm(): void {
        this.submitFormEvent.emit({ formType: ProfileFormEnum.CONFIRM, formValue: this.formConfirm.value });
    }

    requestVerification(): void {
        this.requestVerificationEvent.emit();
    }
}
