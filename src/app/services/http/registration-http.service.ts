import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration } from 'src/app/models/Registration';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationHttpService extends BaseHttpService<Registration> {

  constructor(public http: HttpClient) {
    super(http);
    this.entity = 'registrations'
  }
}
