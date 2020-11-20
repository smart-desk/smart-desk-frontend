import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioFormComponent } from './radio-form/radio-form.component';
import { RadioParamsComponent } from './radio-params/radio-params.component';
import { RadioService } from './radio.service';
import {
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzPopconfirmModule,
    NzRadioModule,
    NzTypographyModule,
} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ],
    providers: [RadioService],
    declarations: [RadioFormComponent, RadioParamsComponent],
    exports: [RadioFormComponent, RadioParamsComponent],
})
export class RadioModule {}
