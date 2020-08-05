import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreatorFieldInputText } from '../../../../shared/models/models.dto';
import { CreatorFieldInputTextService, FieldService } from '../../../../shared/services';
import { FieldSettingsComponent, OperationState } from '../field-settings';

enum Mode {
    EDIT,
    VIEW,
}

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-settings.component.html',
    styleUrls: ['./input-text-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextSettingsComponent extends FieldSettingsComponent<Partial<CreatorFieldInputText>> implements OnInit {
    OperationState = OperationState;
    state: OperationState;

    inputTextForm: FormGroup;

    mode: Mode;
    Mode = Mode;

    constructor(
        private creatorFieldInputTextService: CreatorFieldInputTextService,
        private fieldService: FieldService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.mode = this.field && this.field.data && this.field.data.id ? Mode.VIEW : Mode.EDIT;

        this.inputTextForm = this.fb.group({
            label: [(this.field && this.field.data && this.field.data.label) || '', Validators.required],
            placeholder: [(this.field && this.field.data && this.field.data.placeholder) || ''],
            required: [(this.field && this.field.data && this.field.data.required) || false],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        const input: CreatorFieldInputText = this.inputTextForm.getRawValue();
        input.field_id = this.field.id;

        let request: Observable<CreatorFieldInputText>;

        if (!(this.field && this.field.data && this.field.data.id)) {
            this.state = OperationState.SUCCESS;
            request = this.creatorFieldInputTextService.createInputText(input);
        } else {
            request = this.creatorFieldInputTextService.updateInputText(this.field.data.id, input);
            this.state = OperationState.SUCCESS;
        }

        request.subscribe(res => {
            this.field.data = res;
            this.toggleMode();
            this.save$.next(this.state);

            this.cd.detectChanges();
        });
    }

    toggleMode(): void {
        this.mode = this.mode === Mode.EDIT ? Mode.VIEW : Mode.EDIT;
    }

    cancel(): void {
        if (this.field.data && this.field.data.id) {
            this.toggleMode();
        } else {
            // todo remove if field is created after hitting the OK button
            this.delete();
        }
    }

    delete(): void {
        // in order to delete InputText it would be sufficient to remove corresponding field
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }
}
