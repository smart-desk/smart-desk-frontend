import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './components/index/index.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@NgModule({
    declarations: [IndexComponent],
    imports: [CommonModule, IndexRoutingModule, NzTypographyModule],
})
export class IndexModule {}
