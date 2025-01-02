import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRateingComponent } from './star-rateing.component';

describe('StarRateingComponent', () => {
  let component: StarRateingComponent;
  let fixture: ComponentFixture<StarRateingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRateingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarRateingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
