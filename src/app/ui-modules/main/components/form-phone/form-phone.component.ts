import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../../modules/user/models/user.entity';
import { ProfileFormEnum } from '../../pages/profile/pages/profile/profile-form.enum';
import intlTelInput from 'intl-tel-input';

@Component({
    selector: 'app-form-phone',
    templateUrl: './form-phone.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPhoneComponent implements OnInit, AfterViewInit {
    @Input() profile: User;
    @Output() submitFormEvent$ = new EventEmitter<{ formType: ProfileFormEnum; value: User }>();
    formPhone: FormGroup;

    @ViewChild('phone', { read: ElementRef })
    phoneInput: ElementRef;

    showErrorMessage = false;

    phonePlugin: intlTelInput.Plugin;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.formPhone = this.fb.group({ phone: [this.profile.phone] });
    }

    ngAfterViewInit() {
        this.phonePlugin = intlTelInput(this.phoneInput.nativeElement, {
            preferredCountries: ['ru', 'de'],
            initialCountry: 'ru',
            separateDialCode: true,
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.min.js',
        });
    }

    submit(): boolean {
        if (this.phonePlugin.isValidNumber()) {
            this.setValue();
            this.submitFormEvent$.emit({ formType: ProfileFormEnum.PHONE, value: this.profile });
            return true;
        }
        this.showErrorMessage = true;
        this.cd.detectChanges();
        return false;
    }

    setValue(): void {
        this.profile.phone = this.phonePlugin.getNumber();
    }

    getValidationError(): string {
        switch (this.phonePlugin.getValidationError()) {
            case intlTelInputUtils.validationError.INVALID_COUNTRY_CODE:
                return 'Неправильный код страны';
            case intlTelInputUtils.validationError.TOO_LONG:
                return 'Слишком длинный номер';
            case intlTelInputUtils.validationError.TOO_SHORT:
                return 'Не хватает цифр';
            case intlTelInputUtils.validationError.NOT_A_NUMBER:
                return 'Неправильный номер';
            default:
                return 'Ошибка при вводе номера';
        }
    }
}
