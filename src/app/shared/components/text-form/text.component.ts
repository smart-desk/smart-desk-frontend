import { Component } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { CreatorFieldText } from '../../models/models.dto';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
})
export class TextComponent extends FieldFormComponent<CreatorFieldText> {
    constructor() {
        super();
    }
}
