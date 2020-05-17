import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {NewsPageComponent} from './news-page/news-page.component';
import {ApplicantsPageComponent} from './applicants-page/applicants-page.component';
import {EmployeesPageComponent} from './employees-page/employees-page.component';
import {ContactsPageComponent} from './contacts-page/contacts-page.component';
import {NewsViewPageComponent} from './news-view-page/news-view-page.component';
import {SharedModule} from './shared/shared.module';
import {AuthInterceptor} from './shared/auth.interceptor';
import {FormsModule} from '@angular/forms';
import { EmployeesViewPageComponent } from './employees-view-page/employees-view-page.component';

registerLocaleData(ruLocale, 'ru');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    AboutPageComponent,
    NewsPageComponent,
    ApplicantsPageComponent,
    EmployeesPageComponent,
    ContactsPageComponent,
    NewsViewPageComponent,
    EmployeesViewPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
