import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { PreviewComponent } from './components/preview/preview.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateModelComponent } from './pages/create-model/create-model.component';
import { EditModelComponent } from './pages/edit-model/edit-model.component';
import { ModelsComponent } from './pages/models/models.component';
import { AdvertsListComponent } from './pages/adverts-list/adverts-list.component';
import { SharedModule } from '../../shared/shared.module';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FieldSettingsComponent } from './components/field-settings/field-settings.component';
import { PreviewToolsComponent } from './components/preview-tools/preview-tools.component';
import { AddFieldComponent } from './components/add-field/add-field.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { UsersComponent } from './pages/users/users.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { AdvertsBlockedComponent } from './pages/adverts-blocked/adverts-blocked.component';
import { AdvertsPendingComponent } from './pages/adverts-pending/adverts-pending.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const components = [
    PreviewComponent,
    CategoryFormComponent,
    AdminMenuComponent,
    PreviewToolsComponent,
    FieldSettingsComponent,
    AddFieldComponent,
    RolesFormComponent,
];

const pages = [
    AdminComponent,
    EditModelComponent,
    CreateModelComponent,
    ModelsComponent,
    CategoriesComponent,
    AdvertsListComponent,
    UsersComponent,
    AdvertsBlockedComponent,
    AdvertsPendingComponent,
];

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        CommonModule,
        NzTypographyModule,
        NzIconModule,
        NzButtonModule,
        NzDropDownModule,
        NzFormModule,
        NzInputModule,
        NzPopconfirmModule,
        NzPopoverModule,
        NzTreeModule,
        NzPageHeaderModule,
        NzListModule,
        NzDividerModule,
        NzTableModule,
        NzSelectModule,
        NzLayoutModule,
        NzTabsModule,
        NzDrawerModule,
        NzAvatarModule,
        NzModalModule,
        NzCheckboxModule,
        DragDropModule,
    ],
    declarations: [...pages, ...components],
})
export class AdminModule {}
