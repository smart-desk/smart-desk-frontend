import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { TextParamsDto } from '../dto/text-params.dto';
import { Field } from '../../../../../models/field/field';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-params.component.html',
    styleUrls: ['./text-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextParamsComponent extends AbstractFieldParamsComponent<TextParamsDto> implements OnInit {
    content = '';

    ngOnInit(): void {
        this.content = this.field?.params?.value || '';
    }

    getField(): Field<unknown, TextParamsDto> {
        this.field.params = {
            value: this.content,
        };
        return this.field;
    }
}
