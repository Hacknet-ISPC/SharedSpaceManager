import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionReserva } from './confirmacion-reserva';
import { provideRouter } from '@angular/router';

describe('ConfirmacionReserva', () => {
  let component: ConfirmacionReserva;
  let fixture: ComponentFixture<ConfirmacionReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionReserva],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacionReserva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
