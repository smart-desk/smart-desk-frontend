import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FieldSettingsComponent, OperationState } from '../field-settings';
import { CreatorFieldText, CreatorFieldTextarea } from '../../../../shared/models/models.dto';
import { FieldService } from '../../../../shared/services';
import { Observable } from 'rxjs';
import { CreatorFieldTextEditorService } from '../../../../shared/services/creator/text-editor.service';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor-settings.component.html',
    styleUrls: ['./text-editor-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorSettingsComponent extends FieldSettingsComponent<Partial<CreatorFieldTextarea>> implements OnInit {
    OperationState = OperationState;
    state: OperationState;

    constructor(
        private creatorFieldTextService: CreatorFieldTextEditorService,
        private cd: ChangeDetectorRef,
        private fieldService: FieldService
    ) {
        super();
    }

    ngOnInit(): void {}

    save(): void {
        this.state = OperationState.LOADING;
        this.save$.next(this.state);

        const input = {} as CreatorFieldText;

        input.field_id = this.field.id;

        let request: Observable<CreatorFieldText>;

        if (!(this.field.data && this.field.data.id)) {
            request = this.creatorFieldTextService.createText(input);
        } else {
            request = this.creatorFieldTextService.updateText(this.field.data.id, input);
        }

        request.subscribe(res => {
            this.state = OperationState.SUCCESS;
            this.field.data = res;
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
