import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardInicio } from './dashboard-inicio';
import { provideRouter } from '@angular/router';

describe('DashboardInicio', () => {
  let component: DashboardInicio;
  let fixture: ComponentFixture<DashboardInicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInicio],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardInicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
