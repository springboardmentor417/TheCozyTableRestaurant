import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUIComponent } from './homepage-ui.component';

describe('HomepageUIComponent', () => {
  let component: HomepageUIComponent;
  let fixture: ComponentFixture<HomepageUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageUIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
