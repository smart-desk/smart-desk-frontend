import { Component, OnInit } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent extends FieldFormComponent<any> implements OnInit {
    public text1 = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
    public text2: string;
    constructor() {
        super();
    }

    ngOnInit(): void {}
}
