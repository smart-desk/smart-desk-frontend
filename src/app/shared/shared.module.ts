import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzMessageModule,
    NzPaginationModule,
    NzRadioModule,
} from 'ng-zorro-antd';
import { InputTextFormComponent } from './components/input-text-form/input-text-form.component';
import { TextareaFormComponent } from './components/textarea-form/textarea-form.component';
import { RadioFormComponent } from './components/radio-form/radio-form.component';
import { AdvertService, CategoryService, FieldService, ModelService, SectionService, AuthService } from './services';
import { ApiHostInterceptor, TokenInterceptor, ErrorsInterceptor } from './interceptors';
import { TextComponent } from './components/text/text.component';
import { SearchComponent } from './components/search/search.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DynamicFieldsModule } from './modules/dynamic-fields/dynamic-fields.module';

/**
 * Import here all modules which are used on app side
 */
const NZModules = [NzFormModule, NzRadioModule, NzMessageModule, NzInputModule, NzIconModule, NzButtonModule, NzPaginationModule];

/**
 * Services from `./services` directory
 */
const services = [ModelService, SectionService, FieldService, CategoryService, AdvertService, AuthService];

/**
 * Components from `./components` directory
 */
const components = [InputTextFormComponent, TextareaFormComponent, RadioFormComponent, TextComponent, SearchComponent, PaginationComponent];

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
        useClass: TokenInterceptor,
        multi: true,
    },
];

@NgModule({
    imports: [...NZModules, HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, DynamicFieldsModule],
    exports: [...components],
    declarations: [...components],
    providers: [...services, ...interceptors],
})
export class SharedModule {}
