import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioFormComponent } from './radio-form/radio-form.component';
import { RadioParamsComponent } from './radio-params/radio-params.component';
import { RadioService } from './radio.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RadioViewComponent } from './radio-view/radio-view.component';
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NzFormModule,
        NzTypographyModule,
        NzButtonModule,
        NzIconModule,
        NzPopconfirmModule,
        NzInputModule,
        ReactiveFormsModule,
        NzRadioModule,
        NzDividerModule,
        NzCheckboxModule,
    ],
    providers: [RadioService],
    declarations: [RadioFormComponent, RadioParamsComponent, RadioViewComponent],
    exports: [RadioFormComponent, RadioParamsComponent],
})
export class RadioModule {}
