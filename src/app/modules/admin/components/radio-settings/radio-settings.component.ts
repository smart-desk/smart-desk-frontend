import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldSettingsComponent, OperationState } from '../field-settings';
import { Field, ParamsRadio, RadioData } from '../../../../shared/models/models.dto';
import { FieldService } from '../../../../shared/services';
import { FieldWithData } from '../../../../shared/models/field-with-data';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-settings.component.html',
    styleUrls: ['./radio-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioSettingsComponent extends FieldSettingsComponent<ParamsRadio> implements OnInit {
    form: FormGroup;

    state: OperationState;

    constructor(private fieldService: FieldService, private cd: ChangeDetectorRef, private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        const radios =
            this.field.params && this.field.params.data && this.field.params.data.radios
                ? this.field.params.data.radios.map(data => this.createRadioControl(data))
                : [this.createRadioControl()];

        this.form = this.fb.group({
            title: [this.field.title || ''],
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

        this.field = {
            ...(this.field || {}),
            title,
            params: {
                ...(this.field.params || {}),
                data: { radios },
            },
        } as FieldWithData<ParamsRadio>;

        let request: Observable<Field>;
        if (this.field.id) {
            request = this.fieldService.updateField(this.field.id, this.field);
        } else {
            request = this.fieldService.createField(this.field);
        }
        request.subscribe(
            res => {
                this.field = res as FieldWithData<ParamsRadio>;
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

    deleteField(): void {
        this.updateState(OperationState.LOADING);

        this.fieldService.deleteField(this.field.id).subscribe(
            () => {
                this.delete$.next(this);
            },
            () => {
                this.updateState(OperationState.ERROR);
            }
        );
    }

    private updateState(state: OperationState): void {
        this.state = state;
        this.save$.next(this.state);
    }

    private createRadioControl(radio?: RadioData): FormGroup {
        return this.fb.group({
            label: (radio && radio.label) || '',
            value: (radio && radio.value) || '',
        });
    }

    private convertControlsToRadios(controls: { label: string; value: string }[]): RadioData[] {
        return controls.map((data: RadioData) => {
            const value = new RadioData();
            value.label = data.label;
            value.value = data.label.replace(/\s/g, '').trim().toLocaleLowerCase();
            return value;
        });
    }
}
