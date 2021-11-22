import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @ViewChild('header', { static: true }) headerElRef!: ElementRef;
  @ViewChild('hero', { static: true }) heroElRef!: ElementRef;
  intersectionObserver!: IntersectionObserver;

  constructor() {}

  ngOnInit(): void {
    // Sticky navbar implementation
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const headerEl = this.headerElRef.nativeElement;
        if (!entry.isIntersecting) {
          headerEl.classList.add('sticky');
        } else {
          headerEl.classList.remove('sticky');
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-6%',
      }
    );
    const heroEl = this.heroElRef.nativeElement;
    this.intersectionObserver.observe(heroEl);
  }
}
