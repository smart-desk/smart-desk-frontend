import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(en);

@NgModule({
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule, BrowserAnimationsModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
