import { NzFormModule } from 'ng-zorro-antd/form';
import { ApiHostInterceptor, ErrorsInterceptor, TokenInterceptor } from './interceptors';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AuthGuard } from './modules/auth/auth.guard';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DynamicFieldsModule } from './ui-modules/dynamic-fields/dynamic-fields.module';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ChatModule } from './ui-modules/chat/chat.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BookmarksService } from './modules/bookmarks/bookmarks.service';
import { AdminGuard } from './modules/auth/admin.guard';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { PhoneService } from './modules/phone/phone.service';
import { SearchComponent } from './components/search/search.component';
import { AdService } from './modules/ad/ad.service';
import { ModelService } from './modules/model/model.service';
import { AuthService } from './modules/auth/auth.service';
import { CategoryService } from './modules/category/category.service';
import { ProductService } from './modules/product/product.service';
import { UserService } from './modules/user/user.service';
import { FieldService } from './modules/field/field.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AdMainAdvertComponent } from './components/ad-main-advert/ad-main-advert.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';

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
    NzNotificationModule,
    NzSelectModule,
    NzDatePickerModule,
    NzUploadModule,
    NzCardModule,
];

const services = [
    ModelService,
    FieldService,
    CategoryService,
    ProductService,
    AuthService,
    AuthGuard,
    AdminGuard,
    NzModalService,
    BookmarksService,
    PhoneService,
    UserService,
    AdService,
];

const components = [
    SearchComponent,
    PaginationComponent,
    LoginComponent,
    ForbiddenComponent,
    UnauthorizedComponent,
    AdMainAdvertComponent,
    NotFoundComponent,
];

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
    imports: [
        ...NZModules,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicFieldsModule,
        RouterModule,
        ChatModule,
        ImagekitioAngularModule,
    ],
    exports: [...components],
    declarations: [...components],
    providers: [...services, ...interceptors],
})
export class SharedModule {}
