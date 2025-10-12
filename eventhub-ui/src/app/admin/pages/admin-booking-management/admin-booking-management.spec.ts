import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingManagement } from './admin-booking-management';

describe('AdminBookingManagement', () => {
  let component: AdminBookingManagement;
  let fixture: ComponentFixture<AdminBookingManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookingManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBookingManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
