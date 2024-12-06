import { TestBed } from '@angular/core/testing';

import { CounterDocService } from './counter-doc.service';

describe('CounterDocService', () => {
  let service: CounterDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
