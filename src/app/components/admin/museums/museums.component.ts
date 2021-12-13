import { Component } from '@angular/core';
import { Museum } from 'src/app/models/Museum';
import { MuseumHttpService } from 'src/app/services/http/museum-http.service';
import { BaseComponent } from '../../base/base.component';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoHttpService } from 'src/app/services/http/photo-http.service';
import { Photo } from 'src/app/models/Photo';
import { Observable } from 'rxjs';
import {
  Storage,
  ref,
  deleteObject,
} from '@angular/fire/storage';

@Component({
  selector: 'app-museums',
  templateUrl: './museums.component.html',
  styleUrls: ['./museums.component.scss'],
})
export class MuseumsComponent extends BaseComponent {
  museums: Museum[] = [];

  searchTerm: string = '';

  filteredList: Museum[] = [];

  formVisible = false;
  readonly = false;

  numOfResults?: number;

  museumForm!: FormGroup;

  currentMuseumId: number | undefined = undefined;

  museumPhotos$?: Observable<Photo[]>;

  selectedMuseum = '';

  constructor(
    private museumHttpService: MuseumHttpService,
    private photoHttService: PhotoHttpService,
    private storage: Storage,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllMuseums();
    this.createForm();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  filterMuseums(): void {
    this.filteredList = this.museums;

    this.searchTerm = this.searchTerm.trim().toLowerCase();

    if (!this.searchTerm) {
      this.numOfResults = this.filteredList.length;
    } else if (this.searchTerm.includes(' ')) {
      const searchTermList = this.searchTerm.split(' ');

      for (const searchTerm of searchTermList) {
        this.filteredList = this.filteredList.filter((m) => {
          if (
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.zip.includes(searchTerm) ||
            m.description.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return m;
          }
          return null;
        });
      }
    } else {
      this.filteredList = this.filteredList.filter((m) => {
        if (
          m.name.toLowerCase().includes(this.searchTerm) ||
          m.city.toLowerCase().includes(this.searchTerm) ||
          m.address.toLowerCase().includes(this.searchTerm) ||
          m.zip.toLowerCase().includes(this.searchTerm) ||
          m.description.toLowerCase().includes(this.searchTerm)
        ) {
          return m;
        }
        return null;
      });
    }

    this.numOfResults = this.filteredList.length;
  }

  getAllMuseums(): void {
    // const query = { city, name };
    this.museumHttpService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (museumList: Museum[]) => {
          this.museums = museumList;
          this.numOfResults = this.museums.length;
          this.filteredList = [...this.museums];
          // if (!this.cityList || !this.cityList.length) {
          //   const cities = this.museums.map((m) => m.city);
          //   this.cityList = [...new Set(cities)].sort();
          // }

          // this.nameList = this.museums.map((m) => m.name).sort();
        },
        error: (err) => console.error(err),
      });
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
        .subscribe(
          (savedMuseum: Museum) => {
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

  addPhoto = (museumId: number | undefined, museumName: string) => {
    this.museumPhotos$ = this.photoHttService.getAll({ museumId })
    this.currentMuseumId = museumId;
    this.selectedMuseum = museumName;
  };

  closeImageUpload() {
    this.currentMuseumId = undefined;
    this.selectedMuseum = '';
    console.log('closeImageUpload currentMuseumId', this.currentMuseumId)
  }

  onUrlReceived = (imgUrlAndDescripton: string) => {
    const url = imgUrlAndDescripton.split('&&&')[0];
    const description = imgUrlAndDescripton.split('&&&')[1];

    const museumPhoto: Photo = {
      museumId: this.currentMuseumId,
      url, description
    };

    this.photoHttService
      .create(museumPhoto)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (newPhoto) => {
          console.log('photo saved: ', newPhoto);
          this.museumPhotos$ = this.photoHttService.getAll({ museumId: this.currentMuseumId })
        },
        (error) => alert(error)
      );
  };

  onDeleteImage(url: string, photoId: number | undefined) {
    const confirmed = confirm('are you sure???')
    if (!confirmed) {
      return
    }
    const path = url.split('?')[0].split('/o/')[1].replace(/%2F/ig, '/')
    const refToDelete = ref(this.storage, path)
    deleteObject(refToDelete)
      .then(() => {
        if (photoId)
        this.photoHttService.deleteById(photoId.toString())
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            result => console.log('imgUrl deleted from server and from storage'),
            err => console.log('error deleting imgUrl from server ', err),
            () => this.museumPhotos$ = this.photoHttService.getAll({ museumId: this.currentMuseumId })
          )
      })
      .catch(console.log)

  }

  deleteMuseum(id: number | undefined, name: string): void {
    const confirmed = confirm(
      `You are about to delete: ${name}. Are you sure?`
    );
    if (confirmed && id) {
      this.museumHttpService
        .deleteById(id.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => console.log(`Museum: ${name} has been deleted`),
          (err) => alert(err.message),
          () => {
            this.museums = this.museums.filter((m) => m.id !== Number(id));
          }
        );
    } else {
      return;
    }
  }
}
