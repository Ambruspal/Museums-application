import { Component, OnInit } from '@angular/core';
import { Museum } from 'src/app/models/Museum';
import { MuseumHttpService } from 'src/app/services/http/museum-http.service';
import { BaseComponentComponent } from '../../base-component/base-component.component';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-museums',
  templateUrl: './museums.component.html',
  styleUrls: ['./museums.component.scss']
})
export class MuseumsComponent extends BaseComponentComponent {

  museums: Museum[] = [];

  formVisible = false;

  museumForm!: FormGroup

  constructor(
    private museumHttpService: MuseumHttpService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllMusuems();
    this.createForm();
  }

  getAllMusuems(): void {
    this.museumHttpService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (museumList: Museum[]) => {
          this.museums = museumList;
          console.log(this.museums)
        },
        err => alert(err.message)
      )
  }

  createForm(): void {
    this.museumForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      address: ['', Validators.required],
      openingHours: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  setFormVisibility(): void {
    this.formVisible = !this.formVisible;
  }

  onSubmit(): void {
    console.log(this.museumForm.value);
    if (this.museumForm.value.id) {
      console.log('put request comes')
    } else {
      console.log('create a new museum')
    }
    this.museumForm.reset();
  }

  editMuseum(museum: Museum): void {
    if (!this.formVisible) {
      this.setFormVisibility();
    }
    this.museumForm.patchValue(museum);
  }

}
