import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentChange } from 'ngx-quill/lib/quill-editor.component';
import { FieldSettingsComponent, OperationState } from '../field-settings';
import { CreatorFieldText, CreatorFieldTextarea } from '../../../../shared/models/models.dto';
import { FieldService, CreatorFieldTextService } from '../../../../shared/services';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-settings.component.html',
    styleUrls: ['./text-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSettingsComponent extends FieldSettingsComponent<Partial<CreatorFieldTextarea>> implements OnInit {
    state: OperationState;
    saveContent$ = new Subject<string>();

    constructor(
        private creatorFieldTextService: CreatorFieldTextService,
        private cd: ChangeDetectorRef,
        private fieldService: FieldService
    ) {
        super();

        this.saveContent$
            .pipe(
                distinctUntilChanged(),
                debounceTime(500),
                switchMap(content => {
                    const input: Partial<CreatorFieldText> = {
                        field_id: this.field.id,
                        value: content,
                    };

                    if (this.field.data && this.field.data.id) {
                        return this.creatorFieldTextService.updateText(this.field.data.id, input);
                    }
                    return this.creatorFieldTextService.createText(input);
                })
            )
            .subscribe();
    }

    ngOnInit(): void {}

    save(change: ContentChange): void {
        this.saveContent$.next(change.html);
    }

    delete(): void {
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }
}
