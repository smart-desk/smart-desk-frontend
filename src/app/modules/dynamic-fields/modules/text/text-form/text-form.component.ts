import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { TextParamsDto } from '../dto/text-params.dto';

@Component({
    selector: 'app-text',
    templateUrl: './text-form.component.html',
    styleUrls: ['./text-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFormComponent extends AbstractFieldFormComponent<null, TextParamsDto> implements OnInit {
    content = '';

    constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        const params = this.field.params;
        this.content = this.sanitizer.sanitize(SecurityContext.HTML, params.value || '') as string;
        this.cdr.detectChanges();
    }

    getFieldData(): any {
        return null;
    }

    isFieldDataValid(): boolean {
        return true;
    }
}
