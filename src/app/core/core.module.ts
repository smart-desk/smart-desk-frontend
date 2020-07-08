import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ModelService } from './services/model/model.service';
import { SectionService } from './services/section/section.service';
import { FieldService } from './services/field/field.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [ModelService, SectionService, FieldService],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import CoreModule in the AppModule only.`);
        }
    }
}
