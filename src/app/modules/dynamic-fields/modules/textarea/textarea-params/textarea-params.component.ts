import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../../services';
import { FieldEntity } from '../../../../../models/field/field.entity';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { OperationState } from '../../../../../models/operation-state.enum';
import { TextareaParamsDto } from '../dto/textarea-params.dto';

@Component({
    selector: 'app-textarea-params',
    templateUrl: './textarea-params.component.html',
    styleUrls: ['./textarea-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaParamsComponent extends AbstractFieldParamsComponent<TextareaParamsDto> implements OnInit {
    operationState = OperationState;
    state: OperationState;

    form: FormGroup;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();
    }

    ngOnInit(): void {
        const params = this.field.params;

        this.form = this.fb.group({
            title: [this.field.title, false],
            required: [this.field.required || false],
            placeholder: [params?.placeholder || ''],
            richTextEditor: [params?.richTextEditor || false],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        this.field.params = {
            ...((this.field.params as object) || {}),
            ...this.form.getRawValue(),
        };
        this.field.title = this.form.get('title').value;
        this.field.required = this.form.get('required').value;

        // todo move to parent
        let request: Observable<FieldEntity>;
        if (this.field.id) {
            request = this.fieldService.updateField(this.field.id, this.field);
        } else {
            request = this.fieldService.createField(this.field);
        }

        request.subscribe(res => {
            this.state = OperationState.SUCCESS;
            this.save$.next(this.state);

            this.cd.detectChanges();
        });
    }

    delete(): void {
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }
}
