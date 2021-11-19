import { Component, OnInit } from '@angular/core';
import { Museum } from 'src/app/models/Museum';
import { MuseumHttpService } from 'src/app/services/http/museum-http.service';
import { BaseComponent } from '../../base/base.component';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exhibition } from 'src/app/models/Exhibition';

@Component({
  selector: 'app-museums',
  templateUrl: './museums.component.html',
  styleUrls: ['./museums.component.scss'],
})
export class MuseumsComponent extends BaseComponent {
  museums: Museum[] = [];

  exhibitions: Exhibition[] = [];

  formVisible = false;
  readonly = false;

  exhibitionsVisible = false;

  museumForm!: FormGroup;

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
    this.museumHttpService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (museumList: Museum[]) => {
          this.museums = museumList;
          console.log(this.museums)
        },
        (err) => alert(err.message)
      );
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
    });
  }

  setFormVisibility(): void {
    this.formVisible = !this.formVisible;
    if (this.readonly) {
      this.readonly = false;
    }
    this.museumForm.reset();
  }

  onSubmit(): void {
    // we check if we should update or create a museum.
    if (this.museumForm.value.id) {
      const { id }: { id: string } = this.museumForm.value;
      const payload = this.museumForm.value;

      this.museumHttpService
        .updateById(payload, id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (savedMuseum: Museum) => {
            if (savedMuseum) {
              this.museums = this.museums.map((m) =>
                m.id === Number(id) ? savedMuseum : m
              );
            } else {
              throw new Error('something went wrong');
            }
          },
          (error: any) => alert(error.message),
          () => {
            this.museumForm.reset();
            this.readonly = false;
            this.setFormVisibility();
          }
        );
    } else {
      // we create a new museum entry
      const { name, city, zip, address, openingHours, description } =
        this.museumForm.value;
      const newMuseum: Museum = {
        name,
        city,
        zip,
        address,
        openingHours,
        description,
        exhibitions: [],
      };
      this.museumHttpService
        .create(newMuseum)
        .pipe(takeUntil(this.destroy$))
        .subscribe((savedMuseum: Museum) => {
          if (savedMuseum) {
            this.museums = [...this.museums, savedMuseum];
          } else {
            throw new Error('something went wrong');
          }
        },
        (error: any) => alert(error.message),
          () => {
            this.museumForm.reset();
            this.readonly = false;
            this.setFormVisibility();
          }
        );
    }
  }

  editMuseum(museum: Museum): void {
    if (!this.formVisible) {
      this.setFormVisibility();
    }
    this.museumForm.patchValue(museum);
    this.readonly = true;
  }

  deleteMuseum(id: number | undefined, name: string): void {
    const confirmed = confirm(`You are about to delete: ${name}. Are you sure?`);
    if (confirmed && id) {
      this.museumHttpService.deleteById(id.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => console.log(`Museum: ${name} has been deleted`),
          err => alert(err.message),
          () => {
            this.museums = this.museums.filter(m => m.id !== Number(id));
          }
        )
    } else {
      return;
    }
  }

  showExhibitions(id: number | undefined): void {
    if (this.exhibitionsVisible) {
      this.exhibitionsVisible = false
    }
    if (id) {
      this.museumHttpService.getById(id.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (museum: Museum) => {
            this.exhibitions = museum.exhibitions;
            console.log(this.exhibitions);
          },
          err => alert(err.message),
          () => this.exhibitionsVisible = true
        )
    }
    
  }
}
