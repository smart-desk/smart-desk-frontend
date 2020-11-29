import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-view.component';
import { InputTextEntity } from '../../../../shared/models/dto/field-data/input-text.entity';
import { InputTextParamsDto } from '../../../../shared/models/dto/field-data/input-text-params.dto';

@Component({
    selector: 'app-input-text-view',
    templateUrl: './input-text-view.component.html',
    styleUrls: ['./input-text-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextViewComponent extends AbstractFieldViewComponent<InputTextEntity, InputTextParamsDto> {}
