import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillHoleTypeModalComponent } from './drill-hole-type-modal.component';

describe('DrillHoleTypeModalComponent', () => {
  let component: DrillHoleTypeModalComponent;
  let fixture: ComponentFixture<DrillHoleTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillHoleTypeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillHoleTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
