import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractFieldViewComponent } from '../../../models/abstract-field-view.component';
import { TextareaEntity } from '../dto/textarea.entity';
import { TextareaParamsDto } from '../dto/textarea-params.dto';

@Component({
    selector: 'app-textarea-view',
    templateUrl: './textarea-view.component.html',
    styleUrls: ['./textarea-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaViewComponent extends AbstractFieldViewComponent<TextareaEntity, TextareaParamsDto> implements OnInit {
    text: string;

    constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        const value = this.field?.data?.value;
        this.text = this.sanitizer.sanitize(SecurityContext.HTML, value || '') as string;
        this.cdr.detectChanges();
    }
}
