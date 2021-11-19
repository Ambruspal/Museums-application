import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Museum } from 'src/app/models/Museum';
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
    private museumHttpService: MuseumHttpService
    ) { 
      super();
    }

  id = this.activatedRoute.snapshot.params.id;

  museum!: Museum

  ngOnInit(): void {
    this.getMuseumDetails();
  }

  getMuseumDetails() {
    this.museumHttpService.getById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (returnedMuseum: Museum) => {
          this.museum = returnedMuseum;
          console.log(this.museum);
        },
        err => alert(err.message)
      )
  }

}
