import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exhibition } from 'src/app/models/Exhibition';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionHttpService extends BaseHttpService<Exhibition>{

  constructor(public http: HttpClient) {
    super(http);
    this.entity = 'exhibitions';
  }
}
