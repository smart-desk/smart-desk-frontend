import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiHostInterceptor } from './interceptors';
import { CreatorFieldInputTextService, FieldService, ModelService, SectionService } from './services';

const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiHostInterceptor,
        multi: true,
    },
];

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [CreatorFieldInputTextService, ModelService, SectionService, FieldService, ...interceptors],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import CoreModule in the AppModule only.`);
        }
    }
}
