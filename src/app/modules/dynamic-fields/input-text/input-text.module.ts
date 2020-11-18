import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextService } from './input-text.service';
import { InputTextFormComponent } from './input-text-form/input-text-form.component';
import { InputTextParamsComponent } from './input-text-params/input-text-params.component';

@NgModule({
    imports: [CommonModule],
    providers: [InputTextService],
    declarations: [InputTextFormComponent, InputTextParamsComponent],
    exports: [InputTextFormComponent, InputTextParamsComponent],
})
export class InputTextModule {}
