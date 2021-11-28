import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SharedMainModule } from './shared-main.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        // todo check where to put
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsApiKey,
            libraries: ['places'],
            language: 'ru',
        }),
        NzLayoutModule,
        SharedMainModule,
        NzAlertModule,
    ],
})
export class MainModule {}
