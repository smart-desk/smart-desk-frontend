import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-view.component';
import { RadioEntity } from '../dto/radio.entity';
import { RadioParamsDto } from '../dto/radio-params.dto';

@Component({
    selector: 'app-radio-view',
    templateUrl: './radio-view.component.html',
    styleUrls: ['./radio-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioViewComponent extends AbstractFieldViewComponent<RadioEntity, RadioParamsDto> {}
