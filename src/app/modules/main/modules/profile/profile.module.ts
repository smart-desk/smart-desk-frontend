import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { MyAdvertsComponent } from './components/my-adverts/my-adverts.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { MainModule } from '../../main.module';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const components = [ProfileComponent, BookmarksComponent, MyAdvertsComponent, NotificationsComponent];

@NgModule({
    declarations: [components],
    imports: [CommonModule, ProfileRoutingModule, MainModule, NzTableModule, NzTabsModule, ReactiveFormsModule, NzCheckboxModule],
})
export class ProfileModule {}
