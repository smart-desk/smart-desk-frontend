import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldService } from '../../../../shared/services';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { PriceParamsDto } from '../dto/price-params.dto';
import { CURRENCIES } from '../constants';

@Component({
    selector: 'app-price',
    templateUrl: './price-params.component.html',
    styleUrls: ['./price-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    operationState = OperationState;
    state: OperationState;
    form: FormGroup;
    currencies = CURRENCIES;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();
    }

    ngOnInit(): void {
        const params = this.field.params as PriceParamsDto;
        this.form = this.fb.group({
            currency: [(params && params.currency) || '', Validators.required],
            filterable: [(params && params.filterable) || false]
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        this.field.params = {
            ...((this.field.params as object) || {}),
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
