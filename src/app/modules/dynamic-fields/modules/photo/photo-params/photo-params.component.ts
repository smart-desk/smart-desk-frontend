import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../../services';
import { FieldEntity } from '../../../../../models/field/field.entity';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { OperationState } from '../../../../../models/operation-state.enum';
import { PhotoParamsDto } from '../dto/photo-params.dto';

@Component({
    selector: 'app-photo-params',
    templateUrl: './photo-params.component.html',
    styleUrls: ['./photo-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoParamsComponent extends AbstractFieldParamsComponent<PhotoParamsDto> implements OnInit {
    operationState = OperationState;
    state: OperationState;

    form: FormGroup;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();
    }

    ngOnInit(): void {
        const params = this.field.params;

        this.form = this.fb.group({
            max: [params?.max || 10, Validators.required],
            min: [params?.min || 1],
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
