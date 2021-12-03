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
import { BaseComponent } from './components/base/base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExhibitionsComponent } from './components/exhibition-list/exhibitions.component';

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
    BaseComponent,
    ExhibitionsComponent,
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
