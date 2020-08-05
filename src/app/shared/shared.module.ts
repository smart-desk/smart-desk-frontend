import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NzFormModule, NzInputModule, NzMessageModule, NzRadioModule } from 'ng-zorro-antd';
import { InputTextComponent } from './components/input-text/input-text.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { RadioComponent } from './components/radio/radio.component';
import {
    CategoryService,
    CreatorFieldInputTextService,
    CreatorFieldRadioService,
    CreatorFieldTextareaService,
    FieldService,
    ModelService,
    SectionService,
} from './services';
import { ApiHostInterceptor, ErrorsInterceptor } from './interceptors';

/**
 * Import here all modules which are used on app side
 */
const NZModules = [NzFormModule, NzRadioModule, NzMessageModule, NzInputModule];

/**
 * Services from `./services` directory
 */
const services = [
    CreatorFieldInputTextService,
    CreatorFieldTextareaService,
    CreatorFieldRadioService,
    ModelService,
    SectionService,
    FieldService,
    CategoryService,
];

/**
 * Components from `./components` directory
 */
const components = [InputTextComponent, TextareaComponent, RadioComponent];

/**
 * Interceptors from `./interceptors` directory
 */
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
    imports: [...NZModules, HttpClientModule, CommonModule],
    exports: [],
    declarations: [...components],
    providers: [...services, ...interceptors],
})
export class SharedModule {}
