import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from 'src/app/models/Photo';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoHttpService extends BaseHttpService<Photo> {

  constructor(
    public http: HttpClient
  ) { 
    super(http);
    this.entity = 'photos';
  }
}
