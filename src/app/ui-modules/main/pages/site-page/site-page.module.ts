import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitePageComponent } from './site-page.component';
import { SitePageRoutingModule } from './site-page-routing.module';
import { SharedMainModule } from '../../shared-main.module';

@NgModule({
    declarations: [SitePageComponent],
    imports: [CommonModule, SitePageRoutingModule, SharedMainModule],
})
export class SitePageModule {}
