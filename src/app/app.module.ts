import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';

// todo move to service
const token = localStorage.getItem('token');
const options: any = {
    path: '/socket',
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
        BrowserAnimationsModule,
        SocialLoginModule,
        HttpClientModule,
        SocketIoModule.forRoot(socketIoConfig),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
