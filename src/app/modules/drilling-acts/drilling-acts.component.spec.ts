import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillingActsComponent } from './drilling-acts.component';

describe('DrillingActsComponent', () => {
  let component: DrillingActsComponent;
  let fixture: ComponentFixture<DrillingActsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillingActsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillingActsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
