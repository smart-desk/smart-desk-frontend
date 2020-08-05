import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreatorFieldTextarea } from '../../../../shared/models/models.dto';
import { CreatorFieldTextareaService, FieldService } from '../../../../shared/services';
import { FieldSettingsComponent, OperationState } from '../field-settings';

enum Mode {
    EDIT,
    VIEW,
}

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent extends FieldSettingsComponent<Partial<CreatorFieldTextarea>> implements OnInit {
    OperationState = OperationState;
    state: OperationState;

    form: FormGroup;

    mode: Mode;
    Mode = Mode;

    constructor(
        private creatorFieldTextareaService: CreatorFieldTextareaService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private fieldService: FieldService
    ) {
        super();
    }

    ngOnInit(): void {
        this.mode = this.field && this.field.data && this.field.data.id ? Mode.VIEW : Mode.EDIT;

        this.form = this.fb.group({
            label: [(this.field.data && this.field.data.label) || '', Validators.required],
            placeholder: [(this.field.data && this.field.data.placeholder) || ''],
            required: [(this.field.data && this.field.data.required) || false],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        const input: CreatorFieldTextarea = this.form.getRawValue();
        input.field_id = this.field.id;

        let request: Observable<CreatorFieldTextarea>;

        if (!(this.field.data && this.field.data.id)) {
            request = this.creatorFieldTextareaService.createTextarea(input);
        } else {
            request = this.creatorFieldTextareaService.updateTextarea(this.field.data.id, input);
        }

        request.subscribe(res => {
            this.state = OperationState.SUCCESS;
            this.field.data = res;
            this.toggleMode();
            this.save$.next(this.state);

            this.cd.detectChanges();
        });
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

    toggleMode(): void {
        this.mode = this.mode === Mode.EDIT ? Mode.VIEW : Mode.EDIT;
    }
}
