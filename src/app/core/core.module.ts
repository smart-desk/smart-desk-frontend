import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NzFormModule, NzMessageModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import {
    CreatorFieldInputTextService,
    FieldService,
    ModelService,
    SectionService,
    CategoryService,
    CreatorFieldRadioService,
} from './services';
import { ApiHostInterceptor, ErrorsInterceptor } from './interceptors';
import { InputTextComponent } from './components/input-text/input-text.component';
import { RadioComponent } from './components/radio/radio.component';

const uiModules = [NzIconModule, NzGridModule, NzFormModule, NzInputModule, NzMessageModule, NzRadioModule];

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

@NgModule({
    imports: [...uiModules, HttpClientModule, CommonModule],
    exports: [],
    declarations: [InputTextComponent, RadioComponent],
    providers: [
        CreatorFieldRadioService,
        CreatorFieldInputTextService,
        ModelService,
        SectionService,
        FieldService,
        CategoryService,
        ...interceptors,
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import CoreModule in the AppModule only.`);
        }
    }
}
