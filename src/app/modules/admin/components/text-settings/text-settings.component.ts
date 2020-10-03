import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentChange } from 'ngx-quill/lib/quill-editor.component';
import { FieldSettingsComponent, OperationState } from '../field-settings';
import { ParamsText } from '../../../../shared/models/models.dto';
import { FieldService } from '../../../../shared/services';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { FieldWithData } from '../../../../shared/models/field-with-data';

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
export class TextSettingsComponent extends FieldSettingsComponent<Partial<ParamsText>> implements OnInit {
    state: OperationState;
    saveContent$ = new Subject<string>();
    mode: Mode;
    Mode = Mode;
    content = '';

    constructor(private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();

        this.saveContent$
            .pipe(
                filter(content => !!content),
                distinctUntilChanged(),
                debounceTime(500),
                switchMap(content => {
                    this.field.params = {
                        ...(this.field.params || {}),
                        value: content,
                    };

                    if (this.field.id) {
                        return this.fieldService.updateField(this.field.id, this.field);
                    }
                    return this.fieldService.createField(this.field);
                })
            )
            .subscribe(
                res => {
                    this.field = res;
                    this.state = OperationState.SUCCESS;
                    this.save$.next(this.state);
                    this.mode = Mode.SAVE;
                    this.cd.detectChanges();
                },
                error => {
                    this.state = OperationState.ERROR;
                    this.save$.next(this.state);
                }
            );
    }

    ngOnInit(): void {
        this.content = (this.field.params && this.field.params.value) || '';
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
