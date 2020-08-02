import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreatorFieldText } from '../../../../../core/models/models.dto';
import { CreatorFieldTextAreaService } from '../../../../../core/services';
import { InputBaseDirective, OperationState } from '../input-base';

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
export class TextAreaComponent extends InputBaseDirective<Partial<CreatorFieldText>> implements OnInit {
    OperationState = OperationState;
    state: OperationState;

    textAreaForm: FormGroup;

    mode: Mode;
    Mode = Mode;

    constructor(private creatorFieldTextAreaService: CreatorFieldTextAreaService, private fb: FormBuilder, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        console.log('START TextAreaComponent');
        this.mode = this.data && this.data.id ? Mode.VIEW : Mode.EDIT;

        this.textAreaForm = this.fb.group({
            label: [(this.data && this.data.label) || '', Validators.required],
            placeholder: [(this.data && this.data.placeholder) || ''],
            required: [(this.data && this.data.required) || false],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        const input: CreatorFieldText = this.textAreaForm.getRawValue();
        input.field_id = this.field.id;

        let request: Observable<CreatorFieldText>;

        if (!(this.data && this.data.id)) {
            request = this.creatorFieldTextAreaService.createTextArea(input);
        } else {
            request = this.creatorFieldTextAreaService.updateTextArea(this.data.id, input);
        }

        request.subscribe(res => {
            this.state = OperationState.SUCCESS;
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
