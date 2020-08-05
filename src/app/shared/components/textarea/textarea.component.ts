import { Component, OnInit } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { CreatorFieldTextarea } from '../../models/models.dto';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent extends FieldFormComponent<CreatorFieldTextarea> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {}
}
