import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertEditRoutingModule } from './advert-edit-routing.module';
import { AdvertEditComponent } from './components/advert-edit/advert-edit.component';
import { MainModule } from '../../main.module';

@NgModule({
    declarations: [AdvertEditComponent],
    imports: [CommonModule, AdvertEditRoutingModule, MainModule],
})
export class AdvertEditModule {}
