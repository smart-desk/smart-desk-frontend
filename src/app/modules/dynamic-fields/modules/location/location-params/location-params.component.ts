import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { OperationState } from '../../../../../models/operation-state.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FieldService } from '../../../../../services';

@Component({
    selector: 'app-location-params',
    templateUrl: './location-params.component.html',
    styleUrls: ['./location-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    operationState = OperationState;
    state: OperationState;
    form: FormGroup;

    constructor(private fb: FormBuilder, private fieldService: FieldService, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            title: [this.field.title || ''],
            filterable: [this.field.filterable || false],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        this.field.title = this.form.get('title')?.value;
        this.field.filterable = this.form.get('filterable')?.value;

        this.field.params = {
            ...this.form.getRawValue(),
        };

        const request = this.field.id
            ? this.fieldService.updateField(this.field.id, this.field)
            : this.fieldService.createField(this.field);

        request.subscribe(res => {
            this.state = OperationState.SUCCESS;
            this.field = res;
            this.save$.next(this.state);

            this.cd.detectChanges();
        });
    }
}
