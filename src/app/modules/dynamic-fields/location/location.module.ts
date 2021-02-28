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
import { LocationModalComponent } from './location-modal/location-modal.component';
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzIconModule } from "ng-zorro-antd/icon";

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
        NzRadioModule,
        NzTypographyModule,
        NzIconModule,
    ],
    providers: [LocationService],
    declarations: [LocationFormComponent, LocationParamsComponent, LocationViewComponent, LocationFilterComponent, LocationModalComponent],
    exports: [LocationFormComponent, LocationParamsComponent],
})
export class LocationModule {}
