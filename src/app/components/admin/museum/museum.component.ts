import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Exhibition } from 'src/app/models/Exhibition';
import { Museum } from 'src/app/models/Museum';
import { ExhibitionHttpService } from 'src/app/services/http/exhibition-http.service';
import { MuseumHttpService } from 'src/app/services/http/museum-http.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
  styleUrls: ['./museum.component.scss']
})
export class MuseumComponent extends BaseComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private museumHttpService: MuseumHttpService,
    private exhibitionHttpService: ExhibitionHttpService,
    private fb: FormBuilder
    ) { 
      super();
    }

  id = this.activatedRoute.snapshot.params.id;

  museum!: Museum

  formVisible = false;

  exhibitionForm!: FormGroup

  readonly = false;

  ngOnInit(): void {
    this.getMuseumDetails();
  }

  getMuseumDetails(): void {
    this.museumHttpService.getById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (returnedMuseum: Museum) => {
          this.museum = returnedMuseum;
          console.log(this.museum);
        },
        err => alert(err.message),
        () => this.createForm()
      )
  }

  createForm(): void {
    this.exhibitionForm = this.fb.group({
      id: [''],
      museumId: [this.museum.id],
      title: ['', Validators.required],
      fullPrice: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    })
  }

  setFormVisibility(): void {
    this.formVisible = !this.formVisible;
    if (this.readonly) {
      this.readonly = false;
    }
    this.exhibitionForm.reset();
  }

  onSubmit(): void {
    // we check if we should update or create an exhibition.
    if (this.exhibitionForm.value.id) {
      const { id }: { id: string } = this.exhibitionForm.value;
      const payload = this.exhibitionForm.value;

      this.exhibitionHttpService
        .updateById(payload, id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (savedExhibition: Exhibition) => {
            if (savedExhibition) {
              this.museum.exhibitions = this.museum.exhibitions.map((e) =>
                e.id === Number(id) ? savedExhibition : e
              );
            } else {
              throw new Error('something went wrong');
            }
          },
          err => alert(err.message),
          () => {
            this.exhibitionForm.reset();
            this.readonly = false;
            this.setFormVisibility();
          }
        );
    } else {
      // we create a new exhibition entry
      const { title, fullPrice, description, museumId, capacity, start, end } =
        this.exhibitionForm.value;
      const newExhibition: Exhibition = { title, fullPrice, description, museumId, capacity, start, end, registrations: [] };
      this.exhibitionHttpService
        .create(newExhibition)
        .pipe(takeUntil(this.destroy$))
        .subscribe((savedExhibition: Exhibition) => {
          if (savedExhibition) {
            this.museum.exhibitions = [...this.museum.exhibitions, savedExhibition];
          } else {
            throw new Error('something went wrong');
          }
        },
        error => alert(error.message),
          () => {
            this.exhibitionForm.reset();
            this.readonly = false;
            this.setFormVisibility();
          }
        );
    }
  }


  editExhibition(exhibition: Exhibition): void {
    if (!this.formVisible) {
      this.setFormVisibility();
    }
    this.exhibitionForm.patchValue(exhibition);
    this.readonly = true;
  }

  deleteExhibition(id: number | undefined, title: string): void {
    const confirmed = confirm(`You are about to delete: ${title}. Are you sure?`);
    if (confirmed && id) {
      this.exhibitionHttpService.deleteById(id.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => console.log(`Exhibition: ${name} has been deleted`),
          err => alert(err.message),
          () => {
            this.museum.exhibitions = this.museum.exhibitions.filter(e => e.id !== Number(id));
          }
        )
    } else {
      return;
    }
  }

}
