import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { ExhibitionsComponent } from './components/admin/exhibitions/exhibitions.component';
import { MuseumComponent } from './components/admin/museum/museum.component';
import { MuseumsComponent } from './components/admin/museums/museums.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', component: AdminPageComponent,
    children: [
      { path: 'museums/:id', component: MuseumComponent },
      { path: 'museums', component: MuseumsComponent },
      { path: 'exhibitions', component: ExhibitionsComponent },
      { path: 'registrations', component: RegistrationComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
