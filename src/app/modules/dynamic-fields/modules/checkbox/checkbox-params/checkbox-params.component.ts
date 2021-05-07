import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldService } from '../../../../../services';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FieldEntity } from '../../../../../models/field/field.entity';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { OperationState } from '../../../../../models/operation-state.enum';
import { CheckboxItem, CheckboxParamsDto } from '../dto/checkbox-params.dto';

@Component({
    selector: 'app-checkbox',
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
            params && params.checkboxes ? params.checkboxes.map(data => this.createCheckboxControl(data)) : [this.createCheckboxControl()];

        this.form = this.fb.group({
            title: [this.field.title || ''],
            filterable: [this.field.filterable || false],
            checkboxes: this.fb.array(checkboxes),
        });
    }

    get checkboxes() {
        return this.form.get('checkboxes') as FormArray;
    }

    addCheckbox(): void {
        this.checkboxes.push(this.createCheckboxControl());
    }

    save(): void {
        this.updateState(OperationState.LOADING);

        const checkboxes = this.convertControlsToCheckboxes(this.checkboxes.getRawValue());
        const title = (this.form.get('title') as FormControl).value;
        const filterable = (this.form.get('filterable') as FormControl).value;

        this.field = {
            ...(this.field || {}),
            title,
            filterable,
            params: {
                ...((this.field.params as object) || {}),
                ...this.form.getRawValue(),
                checkboxes,
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

    deleteCheckbox(i: number): void {
        this.checkboxes.removeAt(i);
    }

    private updateState(state: OperationState): void {
        this.state = state;
        this.save$.next(this.state);
    }

    private createCheckboxControl(checkbox?: CheckboxItem): FormGroup {
        return this.fb.group({
            label: (checkbox && checkbox.label) || '',
            value: (checkbox && checkbox.value) || '',
        });
    }

    private convertControlsToCheckboxes(controls: { label: string; value: string }[]): CheckboxItem[] {
        return controls.map((data: CheckboxItem) => {
            const value = new CheckboxItem();
            value.label = data.label;
            value.value = data.label.replace(/\s/g, '').trim().toLocaleLowerCase();
            return value;
        });
    }
}
