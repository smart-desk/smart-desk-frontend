import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreatorFieldInputText } from '../../../../../core/models/models.dto';
import { CreatorFieldInputTextService } from '../../../../../core/services';
import { InputBaseDirective, OperationState } from '../input-base';

enum Mode {
    EDIT,
    VIEW,
}

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends InputBaseDirective<Partial<CreatorFieldInputText>> implements OnInit {
    OperationState = OperationState;
    state: OperationState;

    inputTextForm: FormGroup;

    mode: Mode;
    Mode = Mode;

    constructor(
        private creatorFieldInputTextService: CreatorFieldInputTextService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.mode = this.data && this.data.id ? Mode.VIEW : Mode.EDIT;

        this.inputTextForm = this.fb.group({
            label: [(this.data && this.data.label) || '', Validators.required],
            placeholder: [(this.data && this.data.placeholder) || ''],
            required: [(this.data && this.data.required) || false],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        const input: CreatorFieldInputText = this.inputTextForm.getRawValue();
        input.field_id = this.field.id;

        let request: Observable<CreatorFieldInputText>;

        if (!(this.data && this.data.id)) {
            this.state = OperationState.SUCCESS;
            request = this.creatorFieldInputTextService.createInputText(input);
        } else {
            request = this.creatorFieldInputTextService.updateInputText(this.data.id, input);
            this.state = OperationState.SUCCESS;
        }

        request.subscribe(res => {
            this.data = res;
            this.toggleMode();
            this.save$.next(this.state);

            this.cd.detectChanges();
        });
    }

    private toggleMode(): void {
        this.mode = this.mode === Mode.EDIT ? Mode.VIEW : Mode.EDIT;
    }
}
