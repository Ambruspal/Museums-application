import { TestBed } from '@angular/core/testing';

import { PhotoHttpService } from './photo-http.service';

describe('PhotoHttpService', () => {
  let service: PhotoHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
