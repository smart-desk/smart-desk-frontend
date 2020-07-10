import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { EditModelComponent } from './pages/edit-model/edit-model.component';
import { CreateModelComponent } from './pages/create-model/create-model.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { IconDefinition } from '@ant-design/icons-angular';
import { ApartmentOutline } from '@ant-design/icons-angular/icons';
import { ModelsComponent } from './pages/models/models.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const icons: IconDefinition[] = [ApartmentOutline];

const uiModules = [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule.forRoot(icons),
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
];

@NgModule({
    imports: [...uiModules, FormsModule, HttpClientModule, ReactiveFormsModule, AdminRoutingModule, CommonModule],
    declarations: [AdminComponent, EditModelComponent, CreateModelComponent, ModelsComponent],
})
export class AdminModule {}
