import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { MuseumComponent } from './museum/museum.component';
import { MuseumsComponent } from './museums/museums.component';
import { RegistrationsComponent } from './registrations/registrations.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: 'museums/:id', component: MuseumComponent },
      { path: 'museums', component: MuseumsComponent },
      { path: 'exhibitions', component: ExhibitionsComponent },
      { path: 'registrations', component: RegistrationsComponent },
      { path: '', component: MuseumsComponent },
    ],
  },
];
