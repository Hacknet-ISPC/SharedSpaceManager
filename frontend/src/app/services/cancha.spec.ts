import { TestBed } from '@angular/core/testing';
import { CanchaService } from './cancha.js';

describe('EspacioTs', () => {
  let service: CanchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
