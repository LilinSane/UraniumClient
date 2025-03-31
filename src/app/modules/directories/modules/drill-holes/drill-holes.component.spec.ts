import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillHolesComponent } from './drill-holes.component';

describe('DrillHolesComponent', () => {
  let component: DrillHolesComponent;
  let fixture: ComponentFixture<DrillHolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillHolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillHolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
