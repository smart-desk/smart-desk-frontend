import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { CreatorFieldInputText } from '../../models/models.dto';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends FieldFormComponent<CreatorFieldInputText> {
    constructor() {
        super();
    }
}
