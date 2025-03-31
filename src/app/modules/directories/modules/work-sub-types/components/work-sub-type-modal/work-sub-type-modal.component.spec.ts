import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSubTypeModalComponent } from './work-sub-type-modal.component';

describe('WorkSubTypeModalComponent', () => {
  let component: WorkSubTypeModalComponent;
  let fixture: ComponentFixture<WorkSubTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkSubTypeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkSubTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
