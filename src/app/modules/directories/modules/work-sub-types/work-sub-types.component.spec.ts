import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSubTypesComponent } from './work-sub-types.component';

describe('WorkSubTypesComponent', () => {
  let component: WorkSubTypesComponent;
  let fixture: ComponentFixture<WorkSubTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkSubTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkSubTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
