import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldFormComponent } from '../field-form/field-form.component';
import { CreatorFieldText } from '../../models/models.dto';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
})
export class TextComponent extends FieldFormComponent<CreatorFieldText> implements OnInit {
    content = '';

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit(): void {
        this.content = this.sanitizer.sanitize(SecurityContext.HTML, (this.field.data && this.field.data.value) || '');
    }
}
