import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDirectionModalComponent } from './work-direction-modal.component';

describe('WorkDirectionModalComponent', () => {
  let component: WorkDirectionModalComponent;
  let fixture: ComponentFixture<WorkDirectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkDirectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkDirectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
