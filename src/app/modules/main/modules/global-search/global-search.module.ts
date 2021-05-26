import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchRoutingModule } from './gloval-search-routing.module';
import { GlobalSearchComponent } from './components/global-search/global-search.component';
import { MainModule } from '../../main.module';

@NgModule({
    declarations: [GlobalSearchComponent],
    imports: [CommonModule, GlobalSearchRoutingModule, MainModule],
})
export class GlobalSearchModule {}
