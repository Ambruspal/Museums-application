import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.scss'],
})
export class ExhibitionComponent implements OnInit {
  @Input() exhibitionInChild: any;

  constructor() {}

  ngOnInit(): void {}
}
