import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioReserva } from './formulario-reserva';
import { provideRouter } from '@angular/router';

describe('FormularioReserva', () => {
  let component: FormularioReserva;
  let fixture: ComponentFixture<FormularioReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReserva],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioReserva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form as invalid when empty', () => {
    expect(component.reservaForm.valid).toBe(false);
  });
});
