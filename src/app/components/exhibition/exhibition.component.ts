import { Component, Input, OnInit } from '@angular/core';
import { Exhibition } from 'src/app/models/Exhibition';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.scss'],
})
export class ExhibitionComponent implements OnInit {
  @Input() exhibitionInChild?: Exhibition;

  constructor() {}

  ngOnInit(): void {}
}
