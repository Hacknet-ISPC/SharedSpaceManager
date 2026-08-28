import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLayout } from './user-layout';
import { provideRouter } from '@angular/router';

describe('UserLayout', () => {
  let component: UserLayout;
  let fixture: ComponentFixture<UserLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLayout],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(UserLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
