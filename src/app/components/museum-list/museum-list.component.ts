import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.scss'],
})
export class MuseumListComponent implements OnInit {
  currentDate: string = new Date().toLocaleDateString();

  constructor() {}

  ngOnInit(): void {}
}
