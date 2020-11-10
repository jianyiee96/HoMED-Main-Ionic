import { TestBed } from '@angular/core/testing';

import { MedicalBoardService } from './medical-board.service';

describe('MedicalBoardService', () => {
  let service: MedicalBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
