import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FieldService } from '../../../../shared/services';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { OperationState } from '../../../../shared/models/operation-state.enum';
import { TextParamsDto } from '../../../../shared/models/dto/field-data/text-params.dto';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-params.component.html',
    styleUrls: ['./text-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextParamsComponent extends AbstractFieldParamsComponent implements OnInit {
    state: OperationState;
    content = '';

    constructor(private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();
    }

    ngOnInit(): void {
        this.content = (this.field.params && (this.field.params as TextParamsDto).value) || '';
    }

    save(): void {
        this.field.params = {
            ...((this.field.params as object) || {}),
            value: this.content,
        };

        const request = this.field.id
            ? this.fieldService.updateField(this.field.id, this.field)
            : this.fieldService.createField(this.field);

        request.subscribe(
            res => {
                this.field = res;
                this.state = OperationState.SUCCESS;
                this.save$.next(this.state);
                this.cd.detectChanges();
            },
            error => {
                this.state = OperationState.ERROR;
                this.save$.next(this.state);
            }
        );
    }
}
