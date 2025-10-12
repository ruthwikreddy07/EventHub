import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventManagement } from './admin-event-management';

describe('AdminEventManagement', () => {
  let component: AdminEventManagement;
  let fixture: ComponentFixture<AdminEventManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEventManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
