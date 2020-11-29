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
import { SectionFormComponent } from './components/section-form/section-form.component';
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

const components = [PreviewComponent, CategoryFormComponent, AdminMenuComponent, SectionFormComponent];

const pages = [AdminComponent, EditModelComponent, CreateModelComponent, ModelsComponent, CategoriesComponent, AdvertsListComponent];

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
    ],
    declarations: [...pages, ...components],
})
export class AdminModule {}
