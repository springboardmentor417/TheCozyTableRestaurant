import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyPageComponent } from './reply-page.component';

describe('ReplyPageComponent', () => {
  let component: ReplyPageComponent;
  let fixture: ComponentFixture<ReplyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
