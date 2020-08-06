import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { CreatorFieldInputText } from '../../models/models.dto';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-form.component.html',
    styleUrls: ['./input-text-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextFormComponent extends FieldFormComponent<CreatorFieldInputText> {
    constructor() {
        super();
    }
}
