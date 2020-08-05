import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormInputBaseDirective } from '../input-base';
import { CreatorFieldRadio } from '../../models/models.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends FormInputBaseDirective<CreatorFieldRadio[]> {}
