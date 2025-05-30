import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActCardComponent } from './act-card.component';

describe('ActCardComponent', () => {
  let component: ActCardComponent;
  let fixture: ComponentFixture<ActCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
