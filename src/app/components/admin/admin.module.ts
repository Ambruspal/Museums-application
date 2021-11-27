import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { MuseumsComponent } from './museums/museums.component';
import { MuseumComponent } from './museum/museum.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTES } from './admin.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminPageComponent,
    ExhibitionsComponent,
    MuseumsComponent,
    MuseumComponent,
    RegistrationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
