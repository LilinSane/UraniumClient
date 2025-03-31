import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillHoleModalComponent } from './drill-hole-modal.component';

describe('DrillHoleModalComponent', () => {
  let component: DrillHoleModalComponent;
  let fixture: ComponentFixture<DrillHoleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillHoleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillHoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
