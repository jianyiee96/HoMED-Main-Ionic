import { TestBed } from '@angular/core/testing';

import { MedicalCentreService } from './medical-centre.service';

describe('MedicalCentreService', () => {
  let service: MedicalCentreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalCentreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
