import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { CreatorFieldRadio } from '../../models/models.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends FieldFormComponent<CreatorFieldRadio[]> {}
