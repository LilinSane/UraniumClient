import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDirectionsComponent } from './work-directions.component';

describe('WorkDirectionsComponent', () => {
  let component: WorkDirectionsComponent;
  let fixture: ComponentFixture<WorkDirectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkDirectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
