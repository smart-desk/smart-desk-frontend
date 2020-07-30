import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NzFormModule, NzMessageModule } from 'ng-zorro-antd';
import { ApiHostInterceptor, ErrorsInterceptor } from './interceptors';
import { CreatorFieldInputTextService, FieldService, ModelService, SectionService, CategoryService } from './services';
import { InputTextComponent } from './components/input-text/input-text.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';

const uiModules = [NzIconModule, NzGridModule, NzFormModule, NzInputModule, NzMessageModule];

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
    declarations: [InputTextComponent],
    providers: [CreatorFieldInputTextService, ModelService, SectionService, FieldService, CategoryService, ...interceptors],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import CoreModule in the AppModule only.`);
        }
    }
}
