import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../shared/services';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { InputTextParamsDto } from '../../../../shared/models/dto/field-data/input-text-params.dto';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-params.component.html',
    styleUrls: ['./input-text-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    operationState = OperationState;
    state: OperationState;

    form: FormGroup;

    constructor(private fieldService: FieldService, private fb: FormBuilder, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        const params = this.field.params as InputTextParamsDto;

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

        let request: Observable<FieldEntity>;
        if (this.field.id) {
            request = this.fieldService.updateField(this.field.id, this.field);
        } else {
            request = this.fieldService.createField(this.field);
        }

        request.subscribe(res => {
            this.field = res;
            this.state = OperationState.SUCCESS;
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