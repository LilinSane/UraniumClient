import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillHoleTypesComponent } from './drill-hole-types.component';

describe('DrillHoleTypesComponent', () => {
  let component: DrillHoleTypesComponent;
  let fixture: ComponentFixture<DrillHoleTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillHoleTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillHoleTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
