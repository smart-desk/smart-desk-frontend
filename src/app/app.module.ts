import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';

registerLocaleData(en);

const socialProviders = {
    provide: 'SocialAuthServiceConfig',
    useValue: {
        autoLogin: false,
        providers: [
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(environment.googleClientId),
            },
        ],
    } as SocialAuthServiceConfig,
};

@NgModule({
    providers: [{ provide: NZ_I18N, useValue: en_US }, socialProviders],
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, SocialLoginModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
