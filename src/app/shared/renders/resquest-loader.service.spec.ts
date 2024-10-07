import { TestBed } from '@angular/core/testing';

import { ResquestLoaderService } from './resquest-loader.service';

describe('ResquestLoaderService', () => {
  let service: ResquestLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResquestLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
