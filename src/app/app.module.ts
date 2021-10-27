import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialAuthServiceConfig,
    SocialLoginModule,
    VKLoginProvider,
} from 'angularx-social-login';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { LoginService } from './modules/login/login.service';
import { ProductDataService } from './modules/product/product-data.service';

// todo move to service
const token = localStorage.getItem('token');
const options: any = {
    path: '/socket',
    autoConnect: false,
};
if (token) {
    options.transportOptions = {
        polling: {
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        },
    };
}
const socketIoConfig: SocketIoConfig = { url: environment.webSocketUrl, options };

registerLocaleData(ru);

const socialProviders = {
    provide: 'SocialAuthServiceConfig',
    useValue: {
        autoLogin: false,
        providers: [
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(environment.googleClientId),
            },
            {
                id: VKLoginProvider.PROVIDER_ID,
                provider: new VKLoginProvider(environment.vkAppId),
            },
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider(environment.facebookClientId, { version: 'v10.0' }),
            },
        ],
    } as SocialAuthServiceConfig,
};

@NgModule({
    providers: [{ provide: NZ_I18N, useValue: ru_RU }, socialProviders, LoginService, ProductDataService],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SocialLoginModule,
        HttpClientModule,
        SharedModule,
        ImagekitioAngularModule.forRoot({
            publicKey: environment.imageKitPublicKey,
            urlEndpoint: environment.imageKitUrlEndpoint,
            authenticationEndpoint: environment.imageKitAuthenticationEndpoint,
        }),
        SocketIoModule.forRoot(socketIoConfig),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
