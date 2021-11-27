import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VisitorCategory } from 'src/app/models/Registration';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  visitorCategories: VisitorCategory[] = [
    VisitorCategory.standard,
    VisitorCategory.student,
    VisitorCategory.retired,
    VisitorCategory.museologist,
  ];
  categoriesInHungarian: string[] = [
    'Felnőtt',
    'Tanuló',
    'Nyugdíjas',
    'Muzeológus',
  ];

  registrationForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      personName: new FormControl('', Validators.required),
      visitorCategory: new FormControl('', Validators.required),
      visitTime: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  register(): void {
    console.log(this.registrationForm.controls.visitorCategory.value);
  }
}
