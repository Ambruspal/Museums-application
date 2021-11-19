import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-museum-details',
  templateUrl: './museum-details.component.html',
  styleUrls: ['./museum-details.component.scss'],
})
export class MuseumDetailsComponent implements OnInit {
  exhibitions: String[] = ['one', 'two', 'three'];

  constructor() {}

  ngOnInit(): void {}
}
