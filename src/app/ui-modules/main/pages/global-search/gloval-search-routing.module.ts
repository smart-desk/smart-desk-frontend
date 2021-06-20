import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalSearchComponent } from './components/global-search/global-search.component';

const routes: Routes = [{ path: '', component: GlobalSearchComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GlobalSearchRoutingModule {}
