import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdvertService, CategoryService, FieldService, ModelService, SectionService, AuthService } from './services';
import { ApiHostInterceptor, TokenInterceptor, ErrorsInterceptor } from './interceptors';
import { SearchComponent } from './components/search/search.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DynamicFieldsModule } from './modules/dynamic-fields/dynamic-fields.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginService } from './services/login/login.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoginComponent } from './components/login/login.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AdminGuard } from './services/auth/admin.guard';
import { NzResultModule } from 'ng-zorro-antd/result';
import { RouterModule } from '@angular/router';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { BookmarksService } from './services/bookmarks/bookmarks.service';
import { AddressService } from './services/address/address.service';

/**
 * Import here all modules which are used on app side
 */
const NZModules = [
    NzFormModule,
    NzRadioModule,
    NzMessageModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzPaginationModule,
    NzSpinModule,
    NzResultModule,
];

/**
 * Services from `./services` directory
 */
const services = [
    ModelService,
    SectionService,
    FieldService,
    CategoryService,
    AdvertService,
    AuthService,
    AuthGuard,
    AdminGuard,
    LoginService,
    NzModalService,
    BookmarksService,
    AddressService,
];

/**
 * Components from `./components` directory
 */
const components = [SearchComponent, PaginationComponent, LoginComponent, ForbiddenComponent, UnauthorizedComponent];

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
    imports: [...NZModules, HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, DynamicFieldsModule, RouterModule],
    exports: [...components],
    declarations: [...components],
    providers: [...services, ...interceptors],
})
export class SharedModule {}
