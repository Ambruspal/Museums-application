import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ExhibitionHttpService } from 'src/app/services/http/exhibition-http.service';
import { BaseComponent } from '../base/base.component';
import { Exhibition } from 'src/app/models/Exhibition';
import { takeUntil } from 'rxjs/operators';
import { SubjectService } from 'src/app/services/subject/subject.service';
import * as moment from 'moment';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExhibitionsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  exhibitionList!: Exhibition[];
  filteredExhibitionList!: Exhibition[];

  date: Date = new Date();

  currentMonth!: string;
  currentDay!: string;
  currentDayOfTheMonth!: number;

  currentTime!: { year: number; month: string; day: string; dayDate: number };

  monthsWith31Days: string[] = [
    'Január',
    'Március',
    'Május',
    'Július',
    'Augusztus',
    'Október',
    'December',
  ];

  allVisible: boolean = true;

  constructor(
    private exhibitionHttpService: ExhibitionHttpService,
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentTime = this.getDate();
    this.generateCalendar();
    // Get all exhibitions
    this.exhibitionHttpService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (gottenExhibitionList: Exhibition[]) => {
          this.exhibitionList = gottenExhibitionList;
          this.filteredExhibitionList = this.exhibitionList.slice();
        },
        (err) => console.error(err)
      );
  }

  private getDate(): {
    year: number;
    month: string;
    day: string;
    dayDate: number;
  } {
    const monthList: string[] = [
      'Január',
      'Február',
      'Március',
      'Április',
      'Május',
      'Június',
      'Július',
      'Augusztus',
      'Szeptember',
      'Október',
      'November',
      'December',
    ];

    const dayList: string[] = [
      'Vasárnap',
      'Hétfő',
      'Kedd',
      'Szerda',
      'Csütörtök',
      'Péntek',
      'Szombat',
    ];

    const month = this.date.getMonth();
    this.currentMonth = monthList[month];

    const day = this.date.getDay();
    this.currentDay = dayList[day];

    this.currentDayOfTheMonth = this.date.getDate();

    return {
      year: this.date.getFullYear(),
      month: this.currentMonth,
      day: this.currentDay,
      dayDate: this.currentDayOfTheMonth,
    };
  }

  private generateCalendar(): void {
    let daysInMonth: number;

    if (
      this.currentTime.month === 'Február' &&
      this.currentTime.year % 4 !== 0
    ) {
      daysInMonth = 28;
    } else if (
      this.currentTime.month === 'Február' &&
      this.currentTime.year % 4 === 0
    ) {
      daysInMonth = 29;
    } else if (this.monthsWith31Days.includes(this.currentTime.month)) {
      daysInMonth = 31;
    } else {
      daysInMonth = 30;
    }

    const indexOfTheStartDayOfTheMonth: number =
      Number(moment().clone().startOf('month').format('E')) - 1;

    // Creates empty elements for non-existing days in calendar
    for (let i = 0; i < indexOfTheStartDayOfTheMonth; i++) {
      const divEl = document.createElement('div');
      divEl.classList.add('calendar__number--empty');
      document.querySelector('.calendar__date')?.appendChild(divEl);
    }

    // Prints the dates on calendar and add click listener
    for (let j = 1; j <= daysInMonth; j++) {
      const divEl = document.createElement('div');
      this.currentTime.dayDate === j
        ? divEl.classList.add('calendar__number', 'calendar__number--current')
        : divEl.classList.add('calendar__number');

      divEl.innerText = String(j);
      document.querySelector('.calendar__date')?.appendChild(divEl);

      divEl.addEventListener('click', () => {
        const actualMonth = this.date.getMonth();
        const chosenDay = Number(divEl.innerText);
        const chosenDate = new Date(
          this.currentTime.year,
          actualMonth,
          chosenDay
        );

        this.filteredExhibitionList = this.exhibitionList.filter(
          (exhibition) => {
            const exhibitionStart = new Date(exhibition.start);
            const exhibitionEnd = new Date(exhibition.end);
            return exhibitionStart <= chosenDate && chosenDate <= exhibitionEnd;
          }
        );
        this.subjectService.scrollUpSmoothly();
        this.allVisible = false;
        // this.showButton();
      });
    }
  }

  // private showButton(): void {
  //   const btnEl = document.getElementsByTagName('button')[0];
  //   btnEl.style.display = 'block';
  // }

  // private resetButton(): void {
  //   const btnEl = document.getElementsByTagName('button')[0];
  //   btnEl.style.display = 'none';
  // }

  showAll(): void {
    this.filteredExhibitionList = this.exhibitionList.slice();
    this.subjectService.scrollUpSmoothly();
    this.allVisible = true;
    // this.resetButton();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
