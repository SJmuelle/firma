/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FirmaInternaService } from './firma-interna.service';

describe('Service: FirmaInterna', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirmaInternaService]
    });
  });

  it('should ...', inject([FirmaInternaService], (service: FirmaInternaService) => {
    expect(service).toBeTruthy();
  }));
});
