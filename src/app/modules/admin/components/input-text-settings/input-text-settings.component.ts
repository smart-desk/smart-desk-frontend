import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Field, ParamsInputText } from '../../../../shared/models/models.dto';
import { FieldService } from '../../../../shared/services';
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
export class InputTextSettingsComponent extends FieldSettingsComponent<Partial<ParamsInputText>> implements OnInit {
    OperationState = OperationState;
    state: OperationState;

    form: FormGroup;

    mode: Mode;
    Mode = Mode;

    constructor(private fieldService: FieldService, private fb: FormBuilder, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.mode = this.field.id ? Mode.VIEW : Mode.EDIT;

        this.form = this.fb.group({
            label: [(this.field.params && this.field.params.label) || '', Validators.required],
            placeholder: [(this.field.params && this.field.params.placeholder) || ''],
            required: [(this.field.params && this.field.params.required) || false],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        this.field.params = {
            ...(this.field.params || {}),
            ...this.form.getRawValue(),
        };

        let request: Observable<Field>;
        if (this.field.id) {
            request = this.fieldService.updateField(this.field.id, this.field);
        } else {
            request = this.fieldService.createField(this.field);
        }

        request.subscribe(res => {
            this.field = res;
            this.state = OperationState.SUCCESS;
            this.toggleMode();
            this.save$.next(this.state);

            this.cd.detectChanges();
        });
    }

    toggleMode(): void {
        this.mode = this.mode === Mode.EDIT ? Mode.VIEW : Mode.EDIT;
    }

    cancel(): void {
        this.toggleMode();
    }

    delete(): void {
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }
}
