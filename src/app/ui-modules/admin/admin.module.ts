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
import { ProductListComponent } from './pages/product-list/product-list.component';
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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared.module';
import { AdConfigComponent } from './pages/ad-config/ad-config.component';
import { AdCampaignReasonFormComponent } from './components/ad-campaign-reason-form/ad-campaign-reason-form.component';
import { AdCampaignListComponent } from './pages/ad-campaign-list/ad-campaign-list.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { PromoSetFormComponent } from './components/promo-set-form/promo-set-form.component';
import { SitePagesComponent } from './pages/site-pages/site-pages.component';
import { PageFormComponent } from './components/page-form/page-form.component';
import { QuillModule } from 'ngx-quill';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ProductBlockReasonFormComponent } from './components/product-block-reason-form/product-block-reason-form.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';

const components = [
    AdCampaignReasonFormComponent,
    PreviewComponent,
    CategoryFormComponent,
    AdminMenuComponent,
    PreviewToolsComponent,
    FieldSettingsComponent,
    AddFieldComponent,
    RolesFormComponent,
    PromoSetFormComponent,
    PageFormComponent,
    ProductBlockReasonFormComponent,
];

const pages = [
    AdminComponent,
    EditModelComponent,
    CreateModelComponent,
    ModelsComponent,
    CategoriesComponent,
    ProductListComponent,
    UsersComponent,
    AdConfigComponent,
    AdCampaignListComponent,
    SitePagesComponent,
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
        NzRadioModule,
        QuillModule,
        NzUploadModule,
        NzAlertModule,
    ],
    declarations: [...pages, ...components],
})
export class AdminModule {}
