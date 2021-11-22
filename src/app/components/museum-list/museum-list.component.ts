import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Museum } from 'src/app/models/Museum';
import { MuseumHttpService } from 'src/app/services/http/museum-http.service';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.scss'],
})
export class MuseumListComponent implements OnInit {
  // currentDate: string = new Date().toLocaleDateString();

  constructor(
    private museumHttpService: MuseumHttpService,
    private subjectService: SubjectService
  ) {}

  museumList$: Observable<Museum[]> = this.museumHttpService.getAll();

  ngOnInit(): void {}

  passId(id: number | undefined) {
    this.subjectService.communicationSubject.next(id);
    this.scrollUpSmoothly();
  }

  scrollUpSmoothly() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
