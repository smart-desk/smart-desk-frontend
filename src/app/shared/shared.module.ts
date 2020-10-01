import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule, NzInputModule, NzMessageModule, NzRadioModule } from 'ng-zorro-antd';
import { InputTextFormComponent } from './components/input-text-form/input-text-form.component';
import { TextareaFormComponent } from './components/textarea-form/textarea-form.component';
import { RadioFormComponent } from './components/radio-form/radio-form.component';
import { AdvertService, CategoryService, FieldService, ModelService, SectionService } from './services';
import { ApiHostInterceptor, DevTokenInterceptor, ErrorsInterceptor } from './interceptors';
import { TextComponent } from './components/text/text.component';

/**
 * Import here all modules which are used on app side
 */
const NZModules = [NzFormModule, NzRadioModule, NzMessageModule, NzInputModule];

/**
 * Services from `./services` directory
 */
const services = [ModelService, SectionService, FieldService, CategoryService, AdvertService];

/**
 * Components from `./components` directory
 */
const components = [InputTextFormComponent, TextareaFormComponent, RadioFormComponent, TextComponent];

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
    {
        provide: HTTP_INTERCEPTORS,
        useClass: DevTokenInterceptor,
        multi: true,
    },
];

@NgModule({
    imports: [...NZModules, HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [...components],
    providers: [...services, ...interceptors],
})
export class SharedModule {}
