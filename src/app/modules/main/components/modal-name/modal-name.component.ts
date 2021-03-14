import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ProfileFormEnum } from '../../pages/profile/profile-form.enum';
import { FormNameDataInterface } from './form-name-data.interface';

@Component({
    selector: 'app-modal-name',
    templateUrl: './modal-name.component.html',
})
export class ModalNameComponent implements OnInit, OnChanges {
    @Input() formNameData: FormNameDataInterface;
    @Input() showProfile = false;
    @Output() fileChangedEvent = new EventEmitter<NzUploadChangeParam>();
    @Output() updateNameEvent = new EventEmitter<void>();
    @Output() submitFormEvent = new EventEmitter<{ formType: ProfileFormEnum; formValue: void }>();

    formName: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formName = this.fb.group({
            firstName: [],
            lastName: [],
            avatar: [],
            file: [],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.formName && changes.formNameData?.currentValue.profile) {
            this.formName.patchValue(changes.formNameData?.currentValue.profile);
        }
        if (changes.showProfile) {
            this.showProfile = changes.showProfile?.currentValue;
        }
    }

    fileChanged(event: NzUploadChangeParam): void {
        this.fileChangedEvent.emit(event);
    }

    updateName(): void {
        this.updateNameEvent.emit();
    }

    submitForm(): void {
        this.submitFormEvent.emit({ formType: ProfileFormEnum.NAME, formValue: this.formName.value });
    }
}
