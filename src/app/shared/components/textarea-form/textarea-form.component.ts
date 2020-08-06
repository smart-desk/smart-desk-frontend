import { Component, OnInit } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { CreatorFieldTextarea } from '../../models/models.dto';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea-form.component.html',
    styleUrls: ['./textarea-form.component.scss'],
})
export class TextareaFormComponent extends FieldFormComponent<CreatorFieldTextarea> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {}
}
