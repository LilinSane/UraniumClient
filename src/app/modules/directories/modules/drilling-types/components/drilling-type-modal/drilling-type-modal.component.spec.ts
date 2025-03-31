import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillingTypeModalComponent } from './drilling-type-modal.component';

describe('DrillingTypeModalComponent', () => {
  let component: DrillingTypeModalComponent;
  let fixture: ComponentFixture<DrillingTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillingTypeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillingTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
