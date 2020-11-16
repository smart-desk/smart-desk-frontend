import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldFormComponent } from '../field-form/field-form.component';
import { TextDto } from '../../models/dto/field-params/text.dto';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
})
export class TextComponent extends FieldFormComponent<TextDto> implements OnInit {
    content = '';

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit(): void {
        this.content = this.sanitizer.sanitize(SecurityContext.HTML, (this.field.params && (this.field.params as TextDto).value) || '');
    }

    getValue(): any {
        return null;
    }

    isValid(): boolean {
        return true;
    }
}
