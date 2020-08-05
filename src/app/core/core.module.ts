import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiHostInterceptor, ErrorsInterceptor } from './interceptors';
import {
    CreatorFieldTextareaService,
    CreatorFieldInputTextService,
    CreatorFieldRadioService,
    FieldService,
    ModelService,
    SectionService,
    CategoryService,
} from './services';
import { CommonModule } from '@angular/common';

import { InputTextComponent } from './components/input-text/input-text.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { RadioComponent } from './components/radio/radio.component';
import { NzFormModule, NzMessageModule, NzRadioModule, NzInputModule } from 'ng-zorro-antd';

const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiHostInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorsInterceptor,
        multi: true,
    },
];

const creatorFieldServices = [CreatorFieldInputTextService, CreatorFieldTextareaService, CreatorFieldRadioService];

@NgModule({
    imports: [HttpClientModule, CommonModule, NzFormModule, NzRadioModule, NzMessageModule, NzInputModule],
    exports: [],
    declarations: [InputTextComponent, TextareaComponent, RadioComponent],
    providers: [...creatorFieldServices, ModelService, SectionService, FieldService, CategoryService, ...interceptors],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import CoreModule in the AppModule only.`);
        }
    }
}
