import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBaseDirective, OperationState } from '../input-base';
import { CreatorFieldRadio } from '../../../../../core/models/models.dto';
import { CreatorFieldRadioService } from '../../../../../core/services/creator';
import { FieldService } from '../../../../../core/services';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends InputBaseDirective<CreatorFieldRadio[]> implements OnInit {
    state: OperationState;

    controls: CreatorFieldRadio[] = [];

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
            // todo focus on newly added input
            this.add();
        }
    }

    add(): void {
        const radio = new CreatorFieldRadio();
        this.controls.push(radio);
    }

    change(control: CreatorFieldRadio, newLabel: string): void {
        if (control.label === newLabel) {
            return;
        }

        if (!newLabel) {
            this.delete(control);
        }

        this.updateState(OperationState.LOADING);

        let request: Observable<CreatorFieldRadio>;

        control.label = newLabel;

        if (control.id && control.field_id) {
            request = this.creatorFieldRadioService.updateRadio(control.id, control);
        } else {
            control.value = newLabel.replace(' ', '_');
            control.field_id = this.field.id;
            request = this.creatorFieldRadioService.createRadio(control);
        }

        request.subscribe(
            res => {
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

        console.log('Удалить только один пункт');
        console.log(control);

        this.updateState(OperationState.SUCCESS);
    }

    deleteField(): void {
        // in order to delete all data it would be sufficient to remove corresponding field
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }

    private updateState(state: OperationState): void {
        this.state = state;
        this.save$.next(this.state);
    }
}
