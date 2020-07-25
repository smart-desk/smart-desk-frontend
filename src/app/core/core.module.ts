import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd';
import { ApiHostInterceptor, ErrorsInterceptor } from './interceptors';
import { CreatorFieldInputTextService, FieldService, ModelService, SectionService, CategoryService } from './services';

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
    imports: [HttpClientModule, NzMessageModule],
    exports: [],
    declarations: [],
    providers: [CreatorFieldInputTextService, ModelService, SectionService, FieldService, CategoryService, ...interceptors],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import CoreModule in the AppModule only.`);
        }
    }
}
