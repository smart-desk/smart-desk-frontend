import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBaseDirective, OperationState } from '../input-base';
import { CreatorFieldRadio } from '../../../../../core/models/models.dto';
import { CreatorFieldRadioService } from '../../../../../core/services/creator';
import { FieldService } from '../../../../../core/services';

class CreatorFieldRadioControl extends CreatorFieldRadio {
    edit?: boolean;
}

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends InputBaseDirective<CreatorFieldRadio[]> implements OnInit {
    state: OperationState;

    controls: CreatorFieldRadioControl[] = [];

    constructor(
        private creatorFieldRadioService: CreatorFieldRadioService,
        private fieldService: FieldService,
        private cd: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.field.data) {
            this.controls = [...this.field.data];
        } else {
            this.add();
        }
    }

    add(): void {
        const radio = new CreatorFieldRadioControl();
        radio.edit = true;
        this.controls.push(radio);
    }

    edit(control: CreatorFieldRadioControl): void {
        control.edit = true;
    }

    change(control: CreatorFieldRadioControl): void {
        control.edit = false;

        this.updateState(OperationState.LOADING);

        let request: Observable<CreatorFieldRadio>;

        if (control.id && control.field_id) {
            request = this.creatorFieldRadioService.updateRadio(control.id, control);
        } else {
            control.value = control.label.replace(' ', '_');
            control.field_id = this.field.id;
            request = this.creatorFieldRadioService.createRadio(control);
        }

        request.subscribe(
            res => {
                control.id = res.id;
                this.updateState(OperationState.SUCCESS);
                this.cd.detectChanges();
            },
            err => {
                this.updateState(OperationState.ERROR);
            }
        );
    }

    delete(control: CreatorFieldRadio): void {
        this.updateState(OperationState.LOADING);

        this.creatorFieldRadioService.deleteRadio(control.id).subscribe(
            () => {
                this.controls = this.controls.filter(c => c.id !== control.id);
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

        // in order to delete all data it would be sufficient to remove corresponding field
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
