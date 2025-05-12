import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillingPlanReportComponent } from './drilling-plan-report.component';

describe('DrillingPlanReportComponent', () => {
  let component: DrillingPlanReportComponent;
  let fixture: ComponentFixture<DrillingPlanReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillingPlanReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillingPlanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
