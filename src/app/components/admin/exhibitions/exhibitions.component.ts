import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Exhibition } from 'src/app/models/Exhibition';
import { ExhibitionHttpService } from 'src/app/services/http/exhibition-http.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss']
})
export class ExhibitionsComponent extends BaseComponent {

  constructor(
    private exhibitionHttpService: ExhibitionHttpService
  ) { 
    super();
  }

  exhibitions: Exhibition[] = []

  ngOnInit(): void {
    this.getExhibitons();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  getExhibitons(): void {
    this.exhibitionHttpService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (exhibitionList: Exhibition[]) => {
          this.exhibitions = exhibitionList;
          console.log(this.exhibitions);
        },
        err => alert(err.message)
      )
  }

}
