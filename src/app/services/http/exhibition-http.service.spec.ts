import { TestBed } from '@angular/core/testing';

import { ExhibitionHttpService } from './exhibition-http.service';

describe('ExhibitionHttpService', () => {
  let service: ExhibitionHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhibitionHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
