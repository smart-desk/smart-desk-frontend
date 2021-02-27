import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from './location.service';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationParamsComponent } from './location-params/location-params.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationViewComponent } from './location-view/location-view.component';
import { LocationFilterComponent } from './location-filter/location-filter.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NzButtonModule,
        NzFormModule,
        NzCheckboxModule,
        NzInputModule,
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsApiKey,
            libraries: ['places'],
            language: 'ru',
        }),
    ],
    providers: [LocationService],
    declarations: [LocationFormComponent, LocationParamsComponent, LocationViewComponent, LocationFilterComponent],
    exports: [LocationFormComponent, LocationParamsComponent],
})
export class LocationModule {}
