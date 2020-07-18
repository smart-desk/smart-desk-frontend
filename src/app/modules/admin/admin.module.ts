import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { InputTextComponent } from './core/components/input-text/input-text.component';
import { CreateModelComponent } from './pages/create-model/create-model.component';
import { EditModelComponent } from './pages/edit-model/edit-model.component';
import { ModelsComponent } from './pages/models/models.component';

const creatorInputs = [InputTextComponent];

@NgModule({
    imports: [SharedModule, FormsModule, HttpClientModule, ReactiveFormsModule, AdminRoutingModule, CommonModule],
    declarations: [...creatorInputs, AdminComponent, EditModelComponent, CreateModelComponent, ModelsComponent],
})
export class AdminModule {}
