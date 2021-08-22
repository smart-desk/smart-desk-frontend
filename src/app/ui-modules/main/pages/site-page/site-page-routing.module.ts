import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitePageComponent } from './site-page.component';

const routes: Routes = [
    {
        path: '',
        component: SitePageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SitePageRoutingModule {}
