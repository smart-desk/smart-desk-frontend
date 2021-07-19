import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SharedMainModule } from '../../shared-main.module';

@NgModule({
    declarations: [UserComponent],
    imports: [CommonModule, UserRoutingModule, SharedMainModule, NzTabsModule],
})
export class UserModule {}
