import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventForm } from './admin-event-form';

describe('AdminEventForm', () => {
  let component: AdminEventForm;
  let fixture: ComponentFixture<AdminEventForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEventForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
