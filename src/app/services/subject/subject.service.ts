import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  communicationSubject = new Subject<number | undefined>();

  constructor() {}
}
