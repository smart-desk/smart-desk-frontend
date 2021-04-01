import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const socketIoConfig: SocketIoConfig = { url: environment.webSocketUrl, options: {} };

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
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
        SocialLoginModule,
        NgxMaskModule.forRoot(), // todo remove if not used
        SocketIoModule.forRoot(socketIoConfig),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
