import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertCreateComponent } from './components/advert-create/advert-create.component';

const routes: Routes = [{ path: '', component: AdvertCreateComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertCreateRoutingModule {}
