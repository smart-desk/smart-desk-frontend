import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { FiltersComponent } from './components/filters/filters.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ProductsComponent } from './components/products/products.component';
import { FormNameComponent } from './components/form-name/form-name.component';
import { FormPhoneComponent } from './components/form-phone/form-phone.component';
import { FormVerifyComponent } from './components/form-verify/form-verify.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { VkRedirectComponent } from './components/vk-redirect/vk-redirect.component';
import { FormAdCampaignComponent } from './components/form-ad-campaign/form-ad-campaign.component';
import { AdCampaignCardComponent } from '../../components/ad-campaign-card/ad-campaign-card.component';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxMaskModule } from 'ngx-mask';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PromoSetChooserComponent } from './components/promo-set-chooser/promo-set-chooser.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';

const components = [
    HeaderComponent,
    NavigationHeaderComponent,
    ProductCardComponent,
    ProfileMenuComponent,
    FiltersComponent,
    UserInfoComponent,
    ProductsComponent,
    FormNameComponent,
    FormPhoneComponent,
    FormVerifyComponent,
    ProductFormComponent,
    SortingComponent,
    VkRedirectComponent,
    FormAdCampaignComponent,
    AdCampaignCardComponent,
    ContentLayoutComponent,
    PromoSetChooserComponent,
];

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [
        SharedModule,
        CommonModule,
        NzAvatarModule,
        RouterModule,
        NzButtonModule,
        NzIconModule,
        NzGridModule,
        NzCollapseModule,
        NzFormModule,
        NzUploadModule,
        ReactiveFormsModule,
        NzInputModule,
        NgxMaskModule,
        NzCascaderModule,
        FormsModule,
        NzLayoutModule,
        NzCardModule,
        NzDropDownModule,
        NzRadioModule,
        NzSelectModule,
        NzResultModule,
        NzSpinModule,
        NzDatePickerModule,
        ImagekitioAngularModule,
    ],
})
export class SharedMainModule {}
