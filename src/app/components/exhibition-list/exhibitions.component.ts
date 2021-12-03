import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss'],
})
export class ExhibitionsComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {
    this.currentTime = this.getDate();
    this.generateCalendar();
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

    const date: Date = new Date();

    const month = date.getMonth();
    this.currentMonth = monthList[month];

    const day = date.getDay();
    this.currentDay = dayList[day];

    this.currentDayOfTheMonth = date.getDate();

    return {
      year: date.getFullYear(),
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

    // Prints the dates on calendar
    for (let j = 1; j <= daysInMonth; j++) {
      const divEl = document.createElement('div');
      this.currentTime.dayDate === j
        ? divEl.classList.add('calendar__number', 'calendar__number--current')
        : divEl.classList.add('calendar__number');

      divEl.appendChild(document.createTextNode(String(j)));
      document.querySelector('.calendar__date')?.appendChild(divEl);
    }
  }
}
