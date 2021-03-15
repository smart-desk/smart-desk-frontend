import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../shared/services';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-params.component';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { CheckboxItem, CheckboxParamsDto } from '../dto/checkbox-params.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './checkbox-params.component.html',
    styleUrls: ['./checkbox-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    form: FormGroup;

    state: OperationState;

    constructor(private fieldService: FieldService, private cd: ChangeDetectorRef, private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        const params = this.field.params as CheckboxParamsDto;
        const checkboxes =
            params && params.checkboxes ? params.checkboxes.map(data => this.createRadioControl(data)) : [this.createRadioControl()];

        this.form = this.fb.group({
            title: [this.field.title || ''],
            filterable: [this.field.filterable || false],
            radios: this.fb.array(checkboxes),
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
                radios,
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

    private createRadioControl(checkbox?: CheckboxItem): FormGroup {
        return this.fb.group({
            label: (checkbox && checkbox.label) || '',
            value: (checkbox && checkbox.value) || '',
        });
    }

    private convertControlsToRadios(controls: { label: string; value: string }[]): CheckboxItem[] {
        return controls.map((data: CheckboxItem) => {
            const value = new CheckboxItem();
            value.label = data.label;
            value.value = data.label.replace(/\s/g, '').trim().toLocaleLowerCase();
            return value;
        });
    }
}
