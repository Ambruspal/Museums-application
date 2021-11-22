import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Museum } from 'src/app/models/Museum';
import { MuseumHttpService } from 'src/app/services/http/museum-http.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-museum-details',
  templateUrl: './museum-details.component.html',
  styleUrls: ['./museum-details.component.scss'],
})
export class MuseumDetailsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  currentMuseum!: Museum;

  constructor(
    private museumHttpService: MuseumHttpService,
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit(): void {
    // Get default (first) museum
    this.getDefaultMuseum();
    // Get museum by id from museum-list on click
    this.subjectService.communicationSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (id: number | undefined) => this.getMuseumById(id),
        (err) => console.error(err.message)
      );
  }

  getDefaultMuseum() {
    this.museumHttpService
      .getById('2')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (gottenMuseum: Museum) => (this.currentMuseum = gottenMuseum),
        (err) => console.error(err.message)
      );
  }

  getMuseumById(id: number | undefined) {
    this.museumHttpService
      .getById(String(id))
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (gottenMuseum: Museum) => (this.currentMuseum = gottenMuseum),
        (err) => console.error(err.message)
      );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
