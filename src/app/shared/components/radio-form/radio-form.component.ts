import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { CreatorFieldRadio } from '../../models/models.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-form.component.html',
    styleUrls: ['./radio-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFormComponent extends FieldFormComponent<CreatorFieldRadio[]> {}
