import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldFormComponent } from '../field-form/field-form.component';
import { AdvertFieldBase, ParamsText } from '../../models/models.dto';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
})
export class TextComponent extends FieldFormComponent<ParamsText> implements OnInit {
    content = '';

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit(): void {
        this.content = this.sanitizer.sanitize(SecurityContext.HTML, (this.field.params && this.field.params.value) || '');
    }

    getValue(): AdvertFieldBase {
        return null;
    }

    isValid(): boolean {
        return true;
    }
}
