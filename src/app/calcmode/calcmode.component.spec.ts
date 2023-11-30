import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcmodeComponent } from './calcmode.component';

describe('CalcmodeComponent', () => {
  let component: CalcmodeComponent;
  let fixture: ComponentFixture<CalcmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcmodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
