import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  idSubject$ = new Subject<number | undefined>();

  constructor() {}

  scrollUpSmoothly(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
