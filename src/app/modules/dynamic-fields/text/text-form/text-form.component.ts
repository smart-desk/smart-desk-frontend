import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { TextDto } from '../../../../shared/models/dto/field-params/text.dto';

@Component({
    selector: 'app-text',
    templateUrl: './text-form.component.html',
    styleUrls: ['./text-form.component.scss'],
})
export class TextFormComponent extends AbstractFieldFormComponent<TextDto> implements OnInit {
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
