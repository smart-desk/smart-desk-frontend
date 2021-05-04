import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { FieldEntity } from '../../../../../models/field/field.entity';
import { Observable } from 'rxjs';
import { OperationState } from '../../../../../models/operation-state.enum';
import { FieldService } from '../../../../../services';
import { DatepickerParamsDto } from '../dto/datepicker-params.dto';

@Component({
    selector: 'app-date-range-params',
    templateUrl: './datepicker-params.component.html',
    styleUrls: ['./datepicker-params.component.scss'],
})
export class DatepickerParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    formField: FormGroup;

    constructor(private fieldService: FieldService, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.formField = new FormGroup({
            title: new FormControl(this.field.title || ''),
            filterable: new FormControl(this.field.filterable || false),
            range: new FormControl((this.field.params as DatepickerParamsDto).range || false),
        });
    }

    save(): void {
        this.field = this.getFieldValue();

        let request: Observable<FieldEntity>;
        if (this.field.id) {
            request = this.fieldService.updateField(this.field.id, this.field);
        } else {
            request = this.fieldService.createField(this.field);
        }
        request.subscribe(
            res => {
                this.field = res as FieldEntity;
                this.updateState(OperationState.SUCCESS);
                this.cd.detectChanges();
            },
            () => {
                this.updateState(OperationState.ERROR);
            }
        );
    }

    private updateState(state: OperationState): void {
        this.save$.next(state);
    }

    private getFieldValue(): FieldEntity {
        return {
            ...this.field,
            title: this.formField.get('title').value,
            filterable: this.formField.get('filterable').value,
            params: {
                ...((this.field.params as object) || {}),
                range: this.formField.get('range').value,
            },
        } as FieldEntity;
    }
}
