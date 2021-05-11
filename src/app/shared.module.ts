/**
 * Import here all modules which are used on app side
 */
import { NzFormModule } from 'ng-zorro-antd/form';
import { ApiHostInterceptor, ErrorsInterceptor, TokenInterceptor } from './interceptors';
import { RouterModule } from '@angular/router';
import { AdvertDataService, AdvertService, AuthService, CategoryService, FieldService, ModelService, UserService } from './services';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AuthGuard } from './services/auth/auth.guard';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DynamicFieldsModule } from './modules/dynamic-fields/dynamic-fields.module';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ChatModule } from './modules/chat/chat.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LoginService } from './services/login/login.service';
import { BookmarksService } from './services/bookmarks/bookmarks.service';
import { AdminGuard } from './services/auth/admin.guard';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { PhoneService } from './services/phone/phone.service';
import { SearchComponent } from './components/search/search.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';

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
    FieldService,
    CategoryService,
    AdvertService,
    AuthService,
    AuthGuard,
    AdminGuard,
    LoginService,
    NzModalService,
    BookmarksService,
    PhoneService,
    UserService,
    AdvertDataService,
];

/**
 * Components from `./modules` directory
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
    imports: [...NZModules, CommonModule, FormsModule, ReactiveFormsModule, DynamicFieldsModule, RouterModule, ChatModule],
    exports: [...components],
    declarations: [...components],
    providers: [...services, ...interceptors],
})
export class SharedModule {}
