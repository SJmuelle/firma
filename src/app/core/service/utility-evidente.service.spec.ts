import { TestBed } from '@angular/core/testing';

import { UtilityEvidenteService } from './utility-evidente.service';

describe('UtilityEvidenteService', () => {
  let service: UtilityEvidenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityEvidenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
