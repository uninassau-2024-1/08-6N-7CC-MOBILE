import { TestBed } from '@angular/core/testing';

import { ViaCepService } from '../ViaCEP/via-cep.service';

describe('ViaCepService', () => {
  let service: ViaCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
