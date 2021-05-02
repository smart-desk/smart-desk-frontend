import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldService } from '../../../../../services';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { OperationState } from '../../../../../models/operation-state.enum';
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
            filterable: [this.field.filterable || false],
            currency: [(params && params.currency) || '', Validators.required],
        });
    }

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);
        this.field.filterable = this.form.get('filterable').value;

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
