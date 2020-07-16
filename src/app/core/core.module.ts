import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FieldService, ModelService, SectionService } from './services';
import { CreatorFieldInputTextService } from './services/creator/input-text.service';

const creatorFieldServices = [CreatorFieldInputTextService];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [...creatorFieldServices, ModelService, SectionService, FieldService],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import CoreModule in the AppModule only.`);
        }
    }
}
