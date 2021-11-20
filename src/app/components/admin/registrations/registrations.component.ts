import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent extends BaseComponent {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
