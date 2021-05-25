import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertEditComponent } from './components/advert-edit/advert-edit.component';

const routes: Routes = [{ path: '', component: AdvertEditComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertEditRoutingModule {}
