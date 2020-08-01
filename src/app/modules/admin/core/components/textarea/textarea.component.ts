import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreatorFieldInputText, CreatorFieldTextArea } from 'src/app/core/models/models.dto';
import { CreatorFieldTextAreaService } from 'src/app/core/services/creator/text-area.service';
import { InputBaseDirective, OperationState } from '../input-base';

enum Mode {
    EDIT,
    VIEW,
}

@Component({
    selector: 'app-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends InputBaseDirective<Partial<CreatorFieldInputText>> implements OnInit {
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

        const textArea: CreatorFieldTextArea = this.textAreaForm.getRawValue();
        textArea.field_id = this.field.id;

        let request: Observable<CreatorFieldTextArea>;

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
