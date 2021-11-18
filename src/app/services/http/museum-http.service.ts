import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Museum } from 'src/app/models/Museum';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class MuseumHttpService extends BaseHttpService<Museum> {

  constructor(public http: HttpClient) {
    super(http);
    this.entity = 'museums';
  }
}
