import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { MuseumListComponent } from './components/museum-list/museum-list.component';
import { MuseumDetailsComponent } from './components/museum-details/museum-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [AppComponent, NavComponent, MuseumListComponent, MuseumDetailsComponent, RegistrationComponent, LoginComponent, MainComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
