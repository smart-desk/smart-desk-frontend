import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormNameDataInterface } from '../modal-name/form-name-data.interface';
import { ProfileFormEnum } from '../../pages/profile/profile-form.enum';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-modal-phone',
    templateUrl: './modal-phone.component.html',
})
export class ModalPhoneComponent implements OnInit, OnChanges {
    @Input() formPhoneData;
    @Input() showPhone = false;
    @Output() submitFormEvent = new EventEmitter<{ formType: ProfileFormEnum; formValue: string }>();
    @Output() updatePhoneEvent = new EventEmitter<void>();
    formPhone: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formPhone = this.fb.group({ phone: [] });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.formPhone && changes.formPhoneData?.currentValue) {
            this.formPhone.get('phone').setValue(changes.formPhoneData?.currentValue);
        }
        if (changes.showPhone) {
            this.showPhone = changes.showPhone?.currentValue;
        }
    }

    submitForm(): void {
        this.submitFormEvent.emit({ formType: ProfileFormEnum.PHONE, formValue: this.formPhone.get('phone').value });
    }
}
