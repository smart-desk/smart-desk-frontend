import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FieldService } from '../../../../../services';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { OperationState } from '../../../../../models/operation-state.enum';
import { TextParamsDto } from '../dto/text-params.dto';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-params.component.html',
    styleUrls: ['./text-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextParamsComponent extends AbstractFieldParamsComponent<TextParamsDto> implements OnInit {
    state: OperationState;
    content = '';

    constructor(private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();
    }

    ngOnInit(): void {
        this.content = this.field?.params?.value || '';
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
