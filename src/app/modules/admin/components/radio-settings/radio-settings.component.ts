import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldSettingsComponent, OperationState } from '../field-settings';
import { Field, ParamsRadio } from '../../../../shared/models/models.dto';
import { FieldService } from '../../../../shared/services';
import { FieldWithData } from '../../../../shared/models/field-with-data';

class ParamsRadioControl extends ParamsRadio {
    edit?: boolean;
}

@Component({
    selector: 'app-radio',
    templateUrl: './radio-settings.component.html',
    styleUrls: ['./radio-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioSettingsComponent extends FieldSettingsComponent<ParamsRadio[]> implements OnInit {
    state: OperationState;

    controls: ParamsRadioControl[] = [];

    constructor(private fieldService: FieldService, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        if (this.field && this.field.params) {
            this.controls = [...this.field.params];
        } else {
            this.add();
        }
    }

    add(): void {
        const radio = new ParamsRadioControl();
        radio.edit = true;
        this.controls.push(radio);
    }

    edit(control: ParamsRadioControl): void {
        control.edit = true;
    }

    change(control: ParamsRadioControl): void {
        control.edit = false;

        // this.updateState(OperationState.LOADING);
        //
        // let request: Observable<Field>;
        //
        // if (control.id && control.field_id) {
        //     request = this.fieldService.(control.id, control);
        // } else {
        //     control.value = control.label.replace(' ', '_');
        //     control.field_id = this.field.id;
        //     request = this.creatorFieldRadioService.createRadio(control);
        // }

        // request.subscribe(
        //     res => {
        //         control.id = res.id;
        //         this.updateState(OperationState.SUCCESS);
        //         this.cd.detectChanges();
        //     },
        //     () => {
        //         this.updateState(OperationState.ERROR);
        //     }
        // );
    }

    delete(control: ParamsRadioControl): void {
        this.updateState(OperationState.LOADING);

        this.controls = this.controls.filter(c => c.id !== control.id);

        if (!this.field.id) {
            this.cd.detectChanges();
            return;
        }

        this.fieldService.updateField(this.field.id, this.field).subscribe(
            res => {
                this.field = res as FieldWithData<ParamsRadio[]>;
                this.updateState(OperationState.SUCCESS);
                this.cd.detectChanges();
            },
            () => {
                this.updateState(OperationState.ERROR);
            }
        );
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
}
