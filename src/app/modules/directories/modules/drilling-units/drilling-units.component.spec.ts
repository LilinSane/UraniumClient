import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillingUnitsComponent } from './drilling-units.component';

describe('DrillingUnitsComponent', () => {
  let component: DrillingUnitsComponent;
  let fixture: ComponentFixture<DrillingUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillingUnitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillingUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
