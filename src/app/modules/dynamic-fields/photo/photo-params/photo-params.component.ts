import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../shared/services';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { PhotoParamsDto } from '../../../../shared/models/dto/field-data/photo-params.dto';

enum Mode {
    EDIT,
    VIEW,
}

@Component({
    selector: 'app-textarea',
    templateUrl: './photo-params.component.html',
    styleUrls: ['./photo-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    operationState = OperationState;
    state: OperationState;

    form: FormGroup;

    mode: Mode;
    Mode = Mode;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();
    }

    ngOnInit(): void {
        this.mode = this.field.id ? Mode.VIEW : Mode.EDIT;
        const params = this.field.params as PhotoParamsDto;

        this.form = this.fb.group({
            max: [(params && params.max) || 10, Validators.required],
            min: [(params && params.min) || 1],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        this.field.params = {
            ...((this.field.params as PhotoParamsDto) || {}),
            ...this.form.getRawValue(),
        };

        let request: Observable<FieldEntity>;
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
