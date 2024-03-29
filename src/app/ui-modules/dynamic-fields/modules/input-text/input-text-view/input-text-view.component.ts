import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../models/abstract-field-view.component';
import { InputTextEntity } from '../dto/input-text.entity';
import { InputTextParamsDto } from '../dto/input-text-params.dto';

@Component({
    selector: 'app-input-text-view',
    templateUrl: './input-text-view.component.html',
    styleUrls: ['./input-text-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextViewComponent extends AbstractFieldViewComponent<InputTextEntity, InputTextParamsDto> {}
