import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckPageComponent } from './ack-page.component';

describe('AckPageComponent', () => {
  let component: AckPageComponent;
  let fixture: ComponentFixture<AckPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AckPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
