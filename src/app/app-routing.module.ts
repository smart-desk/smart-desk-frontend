import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./ui-modules/admin/admin.module').then(m => m.AdminModule),
    },
    {
        path: '',
        loadChildren: () => import('./ui-modules/main/main.module').then(m => m.MainModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
