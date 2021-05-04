import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { FieldEntity } from '../../../../../models/field/field.entity';
import { Observable } from 'rxjs';
import { OperationState } from '../../../../../models/operation-state.enum';
import { FieldService } from '../../../../../services';

@Component({
    selector: 'app-date-range-params',
    templateUrl: './date-range-params.component.html',
    styleUrls: ['./date-range-params.component.scss'],
})
export class DateRangeParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    form: FormGroup;

    constructor(private fieldService: FieldService, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl(undefined),
            range: new FormControl(false),
            filterable: new FormControl(false),
            required: new FormControl(false),
        });
    }

    save() {
        this.field = {
            ...(this.field || {}),
            title: this.form.get('title').value,
            filterable: this.form.get('filterable').value,
            params: {
                ...((this.field.params as object) || {}),
                ...this.form.getRawValue(),
            },
        } as FieldEntity;

        let request: Observable<FieldEntity>;
        if (this.field.id) {
            request = this.fieldService.updateField(this.field.id, this.field);
        } else {
            request = this.fieldService.createField(this.field);
        }
        request.subscribe(
            res => {
                this.field = res as FieldEntity;
                // todo release updateState
                // this.updateState(OperationState.SUCCESS);
                this.cd.detectChanges();
            },
            () => {
                // todo release updateState
                // this.updateState(OperationState.ERROR);
            }
        );
    }
}
