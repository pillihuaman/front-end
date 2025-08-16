import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServPillihuamanLeftMenuComponent } from './serv-pillihuaman-left-menu.component';

describe('ServPillihuamanLeftMenuComponent', () => {
  let component: ServPillihuamanLeftMenuComponent;
  let fixture: ComponentFixture<ServPillihuamanLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServPillihuamanLeftMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServPillihuamanLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
