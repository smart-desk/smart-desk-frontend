import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../shared/services';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { RadioItem, RadioParamsDto } from '../dto/radio-params.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-params.component.html',
    styleUrls: ['./radio-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    form: FormGroup;

    state: OperationState;

    constructor(private fieldService: FieldService, private cd: ChangeDetectorRef, private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        const params = this.field.params as RadioParamsDto;
        const radios = params && params.radios ? params.radios.map(data => this.createRadioControl(data)) : [this.createRadioControl()];

        this.form = this.fb.group({
            title: [this.field.title || ''],
            filterable: [this.field.filterable || false],
            radios: this.fb.array(radios),
        });
    }

    get radios() {
        return this.form.get('radios') as FormArray;
    }

    addRadio(): void {
        this.radios.push(this.createRadioControl());
    }

    save(): void {
        this.updateState(OperationState.LOADING);

        const radios = this.convertControlsToRadios(this.radios.getRawValue());
        const title = this.form.get('title').value;
        const filterable = this.form.get('filterable').value;

        this.field = {
            ...(this.field || {}),
            title,
            filterable,
            params: {
                ...((this.field.params as object) || {}),
                ...this.form.getRawValue(),
                radios
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
                this.field = res as FieldEntity; // todo create Field class
                this.updateState(OperationState.SUCCESS);
                this.cd.detectChanges();
            },
            () => {
                this.updateState(OperationState.ERROR);
            }
        );
    }

    deleteRadio(i: number): void {
        this.radios.removeAt(i);
    }

    private updateState(state: OperationState): void {
        this.state = state;
        this.save$.next(this.state);
    }

    private createRadioControl(radio?: RadioItem): FormGroup {
        return this.fb.group({
            label: (radio && radio.label) || '',
            value: (radio && radio.value) || '',
        });
    }

    private convertControlsToRadios(controls: { label: string; value: string }[]): RadioItem[] {
        return controls.map((data: RadioItem) => {
            const value = new RadioItem();
            value.label = data.label;
            value.value = data.label.replace(/\s/g, '').trim().toLocaleLowerCase();
            return value;
        });
    }
}
