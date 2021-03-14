import { NgxMaskModule, IConfig } from 'ngx-mask';

// @ts-ignore
@NgModule({
    declarations: [],
    imports: [NgxMaskModule.forRoot()],
})
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
