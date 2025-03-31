import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillingTypesComponent } from './drilling-types.component';

describe('DrillingTypesComponent', () => {
  let component: DrillingTypesComponent;
  let fixture: ComponentFixture<DrillingTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillingTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
