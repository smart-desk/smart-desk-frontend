import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentChange } from 'ngx-quill/lib/quill-editor.component';
import { FieldService } from '../../../../shared/services';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { TextDto } from '../../../../shared/models/dto/field-params/text.dto';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { OperationState } from '../../../../shared/models/operation-state.enum';

enum Mode {
    EDIT,
    SAVE,
}

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-params.component.html',
    styleUrls: ['./text-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextParamsComponent extends AbstractFieldParamsComponent implements OnInit {
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
        this.content = (this.field.params && (this.field.params as TextDto).value) || '';
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
