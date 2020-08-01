import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputBaseDirective } from '../input-base';
import { CreatorFieldInputText } from '../../models/models.dto';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends InputBaseDirective<CreatorFieldInputText> {
    constructor() {
        super();
    }
}
