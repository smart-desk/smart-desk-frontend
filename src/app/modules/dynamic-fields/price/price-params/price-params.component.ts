import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../shared/services';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
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

    delete(): void {
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }
}
