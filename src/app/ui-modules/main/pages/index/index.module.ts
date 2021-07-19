import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './components/index/index.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SharedMainModule } from '../../shared-main.module';
import { SharedModule } from '../../../../shared.module';

@NgModule({
    declarations: [IndexComponent],
    imports: [CommonModule, IndexRoutingModule, NzTypographyModule, SharedMainModule, SharedModule],
})
export class IndexModule {}
