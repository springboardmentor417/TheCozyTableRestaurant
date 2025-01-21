import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemNavComponent } from './menu-item-nav.component';

describe('MenuItemNavComponent', () => {
  let component: MenuItemNavComponent;
  let fixture: ComponentFixture<MenuItemNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuItemNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
