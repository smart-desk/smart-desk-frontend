import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentChange } from 'ngx-quill/lib/quill-editor.component';
import { FieldSettingsComponent, OperationState } from '../field-settings';
import { CreatorFieldText } from '../../../../shared/models/models.dto';
import { CreatorFieldTextService, FieldService } from '../../../../shared/services';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

enum Mode {
    EDIT,
    SAVE,
}

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-settings.component.html',
    styleUrls: ['./text-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSettingsComponent extends FieldSettingsComponent<Partial<CreatorFieldText>> implements OnInit {
    state: OperationState;
    saveContent$ = new Subject<string>();
    mode: Mode;
    Mode = Mode;

    content = '';

    constructor(
        private creatorFieldTextService: CreatorFieldTextService,
        private cd: ChangeDetectorRef,
        private fieldService: FieldService
    ) {
        super();

        this.saveContent$
            .pipe(
                filter(content => !!content),
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
            .subscribe(
                res => {
                    this.field.data = res;
                    this.state = OperationState.SUCCESS;
                    this.save$.next(this.state);
                    this.mode = Mode.SAVE;
                },
                error => {
                    this.state = OperationState.ERROR;
                    this.save$.next(this.state);
                }
            );
    }

    ngOnInit(): void {
        this.content = (this.field.data && this.field.data.value) || '';
        this.mode = Mode.SAVE;
    }

    save(change: ContentChange): void {
        this.mode = Mode.EDIT;
        this.saveContent$.next(change.html);
    }

    delete(): void {
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }
}
