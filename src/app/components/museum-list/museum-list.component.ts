import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Museum } from 'src/app/models/Museum';
import { MuseumHttpService } from 'src/app/services/http/museum-http.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.scss'],
})
export class MuseumListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  museumList!: Museum[];
  filteredList!: Museum[];

  city: FormControl = new FormControl('város szerint');
  name: FormControl = new FormControl('név szerint');

  cityList!: string[];
  nameList!: string[];

  isResetButtonActive: boolean = false;

  constructor(
    private museumHttpService: MuseumHttpService,
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit(): void {
    // Get all museums and set up select fields
    this.museumHttpService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (gottenMuseumList: Museum[]) => (this.museumList = gottenMuseumList),
        (err) => console.error(err.message),
        () => {
          this.filteredList = this.museumList.slice();
          // Load first museum
          this.passId(this.filteredList[0].id);

          this.cityList = [
            ...new Set(this.filteredList.map((museum) => museum.city)),
          ].sort();
          this.renderNameList();
        }
      );

    // Update filteredList and nameList on select, plus load new first museum
    // city
    this.city.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      (selectedCity: string) => {
        this.filteredList = this.museumList.filter(
          (museum) => museum.city === selectedCity
        );
        this.passId(this.filteredList[0].id);
        this.renderNameList();
        if (this.name.value !== 'név szerint') this.clearNameValue();
        this.isResetButtonActive = true;
      },
      (err) => console.error(err.message)
    );
    // name
    this.name.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      (selectedName: string) => {
        this.filteredList = this.museumList.filter(
          (museum) => museum.name === selectedName
        );
        this.passId(this.filteredList[0].id);
        this.isResetButtonActive = true;
      },
      (err) => console.error(err.message)
    );
  }

  showAll(): void {
    this.clearCityValue();
    this.clearNameValue();
    this.filteredList = this.museumList.slice();
    this.renderNameList();
    // Load new first museum
    this.passId(this.filteredList[0].id);
    this.isResetButtonActive = false;
  }

  passId(id: number | undefined): void {
    this.subjectService.idSubject$.next(id);
    this.subjectService.scrollUpSmoothly();
  }

  private renderNameList(): void {
    this.nameList = this.filteredList.map((museum) => museum.name).sort();
  }

  private clearCityValue(): void {
    this.city.reset('város szerint', { emitEvent: false });
  }

  private clearNameValue(): void {
    this.name.reset('név szerint', { emitEvent: false });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
