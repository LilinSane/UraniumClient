import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillingUnitModalComponent } from './drilling-unit-modal.component';

describe('DrillingUnitModalComponent', () => {
  let component: DrillingUnitModalComponent;
  let fixture: ComponentFixture<DrillingUnitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillingUnitModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillingUnitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
