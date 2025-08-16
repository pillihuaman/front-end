import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServPillihuamanSidebarHomeComponent } from './serv-pillihuaman-sidebar-home.component';

describe('ServPillihuamanSidebarHomeComponent', () => {
  let component: ServPillihuamanSidebarHomeComponent;
  let fixture: ComponentFixture<ServPillihuamanSidebarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServPillihuamanSidebarHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServPillihuamanSidebarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
