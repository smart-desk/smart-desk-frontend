import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { InputTextComponent } from './core/components/input-text/input-text.component';
import { CreateModelComponent } from './pages/create-model/create-model.component';
import { EditModelComponent } from './pages/edit-model/edit-model.component';
import { ModelsComponent } from './pages/models/models.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AdminMenuComponent } from './core/components/admin-menu/admin-menu.component';
import { CategoryFormComponent } from './core/components/category-form/category-form.component';
import { PreviewComponent } from './core/components/preview/preview.component';
import { RadioComponent } from './core/components/radio/radio.component';

const creatorInputs = [InputTextComponent];

const uiModules = [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzTypographyModule,
    NzButtonModule,
    NzSelectModule,
    NzListModule,
    NzPopconfirmModule,
    NzPageHeaderModule,
    NzPopoverModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzDividerModule,
    NzAlertModule,
    NzMessageModule,
    NzTreeModule,
];

@NgModule({
    imports: [...uiModules, SharedModule, FormsModule, ReactiveFormsModule, AdminRoutingModule, CommonModule],
    declarations: [
        ...creatorInputs,
        AdminComponent,
        EditModelComponent,
        CreateModelComponent,
        ModelsComponent,
        CategoriesComponent,
        AdminMenuComponent,
        CategoryFormComponent,
        PreviewComponent,
        RadioComponent,
    ],
})
export class AdminModule {}
