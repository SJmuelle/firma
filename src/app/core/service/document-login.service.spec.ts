import { TestBed } from '@angular/core/testing';

import { DocumentLoginService } from './document-login.service';

describe('DocumentLoginService', () => {
  let service: DocumentLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
