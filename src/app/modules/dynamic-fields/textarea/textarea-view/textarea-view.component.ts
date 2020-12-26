import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-view.component';
import { TextareaEntity } from '../dto/textarea.entity';
import { TextareaParamsDto } from '../dto/textarea-params.dto';

@Component({
    selector: 'app-textarea-view',
    templateUrl: './textarea-view.component.html',
    styleUrls: ['./textarea-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaViewComponent extends AbstractFieldViewComponent<TextareaEntity, TextareaParamsDto> {}
