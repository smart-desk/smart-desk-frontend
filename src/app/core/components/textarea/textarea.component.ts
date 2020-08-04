import { Component, OnInit } from '@angular/core';
import { InputBaseDirective } from '../input-base';
import { CreatorFieldText } from '../../models/models.dto';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent extends InputBaseDirective<CreatorFieldText> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {}
}
