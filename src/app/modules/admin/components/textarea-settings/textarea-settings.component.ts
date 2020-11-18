import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../shared/services';
import { FieldSettingsComponent, OperationState } from '../field-settings';
import { TextareaDto } from '../../../../shared/models/dto/field-params/textarea.dto';
import { Field } from '../../../../shared/models/dto/field.entity';

enum Mode {
    EDIT,
    VIEW,
}

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea-settings.component.html',
    styleUrls: ['./textarea-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaSettingsComponent extends FieldSettingsComponent<TextareaDto> implements OnInit {
    OperationState = OperationState;
    state: OperationState;

    form: FormGroup;

    mode: Mode;
    Mode = Mode;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();
    }

    ngOnInit(): void {
        this.mode = this.field.id ? Mode.VIEW : Mode.EDIT;

        this.form = this.fb.group({
            // todo
            label: [(this.field.params && (this.field.params as TextareaDto).label) || '', Validators.required],
            placeholder: [(this.field.params && (this.field.params as TextareaDto).placeholder) || ''],
            required: [(this.field.params && (this.field.params as TextareaDto).required) || false],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        this.field.params = {
            ...(this.field.params || {}),
            ...this.form.getRawValue(),
        };
        this.field.title = (this.field.params as TextareaDto).label;

        let request: Observable<Field>;
        if (this.field.id) {
            request = this.fieldService.updateField(this.field.id, this.field);
        } else {
            request = this.fieldService.createField(this.field);
        }

        request.subscribe(res => {
            this.state = OperationState.SUCCESS;
            this.field = res;
            this.toggleMode();
            this.save$.next(this.state);

            this.cd.detectChanges();
        });
    }

    cancel(): void {
        this.toggleMode();
    }

    delete(): void {
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }

    toggleMode(): void {
        this.mode = this.mode === Mode.EDIT ? Mode.VIEW : Mode.EDIT;
    }
}
