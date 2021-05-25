import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertComponent } from './components/advert/advert.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AdvertRoutingModule } from './advert-routing.module';
import { MainModule } from '../../main.module';

@NgModule({
    declarations: [AdvertComponent],
    imports: [MainModule, CommonModule, NzAvatarModule, AdvertRoutingModule, NzIconModule, NzButtonModule],
})
export class AdvertModule {}
