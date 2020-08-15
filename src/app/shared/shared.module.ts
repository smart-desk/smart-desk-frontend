import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NzFormModule, NzInputModule, NzMessageModule, NzRadioModule } from 'ng-zorro-antd';
import { InputTextFormComponent } from './components/input-text-form/input-text-form.component';
import { TextareaFormComponent } from './components/textarea-form/textarea-form.component';
import { RadioFormComponent } from './components/radio-form/radio-form.component';
import { EditorModule } from 'primeng/editor';
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
import { TextEditorComponent } from './components/text-editor-form/text-editor.component';
import { FormsModule } from '@angular/forms';
import { CreatorFieldTextService } from './services/creator/text.service';

/**
 * Import here all modules which are used on app side
 */
const NZModules = [NzFormModule, NzRadioModule, NzMessageModule, NzInputModule];

/**
 * Services from `./services` directory
 */
const services = [
    CreatorFieldTextService,
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
const components = [InputTextFormComponent, TextareaFormComponent, RadioFormComponent, TextEditorComponent];

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
    imports: [...NZModules, EditorModule, HttpClientModule, CommonModule, FormsModule],
    exports: [],
    declarations: [...components],
    providers: [...services, ...interceptors],
})
export class SharedModule {}
