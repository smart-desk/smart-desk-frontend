import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-view.component';
import { TextareaEntity } from '../../../../shared/models/dto/field-data/textarea.entity';
import { TextareaParamsDto } from '../../../../shared/models/dto/field-data/textarea-params.dto';

@Component({
    selector: 'app-textarea-view',
    templateUrl: './textarea-view.component.html',
    styleUrls: ['./textarea-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaViewComponent extends AbstractFieldViewComponent<TextareaEntity, TextareaParamsDto> {}
