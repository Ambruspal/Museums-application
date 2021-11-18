import { TestBed } from '@angular/core/testing';

import { MuseumHttpService } from './museum-http.service';

describe('MuseumHttpService', () => {
  let service: MuseumHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuseumHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
