import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { MuseumListComponent } from './components/museum-list/museum-list.component';
import { MuseumDetailsComponent } from './components/museum-details/museum-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ExhibitionComponent } from './components/exhibition/exhibition.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { MuseumsComponent } from './components/admin/museums/museums.component';
import { ExhibitionsComponent } from './components/admin/exhibitions/exhibitions.component';
import { RegistrationsComponent } from './components/admin/registrations/registrations.component';
import { BaseComponent } from './components/base/base.component';
import { MuseumComponent } from './components/admin/museum/museum.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MuseumListComponent,
    MuseumDetailsComponent,
    SignupComponent,
    LoginComponent,
    MainComponent,
    ExhibitionComponent,
    AdminPageComponent,
    MuseumsComponent,
    ExhibitionsComponent,
    ExhibitionComponent,
    RegistrationsComponent,
    BaseComponent,
    MuseumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
