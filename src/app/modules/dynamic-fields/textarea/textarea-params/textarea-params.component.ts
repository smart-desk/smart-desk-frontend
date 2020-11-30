import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../shared/services';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { TextareaParamsDto } from '../../../../shared/models/dto/field-data/textarea-params.dto';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea-params.component.html',
    styleUrls: ['./textarea-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    operationState = OperationState;
    state: OperationState;

    form: FormGroup;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();
    }

    ngOnInit(): void {
        const params = this.field.params as TextareaParamsDto;

        this.form = this.fb.group({
            label: [(params && params.label) || '', Validators.required],
            placeholder: [(params && params.placeholder) || ''],
            required: [(params && params.required) || false],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        this.field.params = {
            ...((this.field.params as object) || {}),
            ...this.form.getRawValue(),
        };
        this.field.title = (this.field.params as TextareaParamsDto).label;

        let request: Observable<FieldEntity>;
        if (this.field.id) {
            request = this.fieldService.updateField(this.field.id, this.field);
        } else {
            request = this.fieldService.createField(this.field);
        }

        request.subscribe(res => {
            this.state = OperationState.SUCCESS;
            this.field = res;
            this.save$.next(this.state);

            this.cd.detectChanges();
        });
    }

    cancel(): void {}

    delete(): void {
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }
}
