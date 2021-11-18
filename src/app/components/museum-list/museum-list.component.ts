import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Museum } from 'src/app/models/Museum';
import { MuseumHttpService } from 'src/app/services/http/museum-http.service';

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.scss'],
})
export class MuseumListComponent implements OnInit {
  currentDate: string = new Date().toLocaleDateString();

  constructor(
    private museumHttpService: MuseumHttpService
  ) {}

  museumList$: Observable<Museum[]> = this.museumHttpService.getAll();

  ngOnInit(): void {}
}
