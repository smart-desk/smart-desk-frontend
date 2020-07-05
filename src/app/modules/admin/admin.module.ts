import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { EditModelComponent } from './pages/edit-model/edit-model.component';
import { CreateModelComponent } from './pages/create-model/create-model.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { ApartmentOutline } from '@ant-design/icons-angular/icons';
import { ModelsComponent } from './pages/models/models.component';

const icons: IconDefinition[] = [ApartmentOutline];

@NgModule({
    imports: [AdminRoutingModule, CommonModule, NzLayoutModule, NzMenuModule, NzIconModule.forRoot(icons)],
    declarations: [AdminComponent, EditModelComponent, CreateModelComponent, ModelsComponent],
})
export class AdminModule {}
