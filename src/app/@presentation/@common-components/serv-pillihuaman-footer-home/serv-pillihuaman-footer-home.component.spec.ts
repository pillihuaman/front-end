import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServPillihuamanFooterHomeComponent } from './serv-pillihuaman-footer-home.component';

describe('ServPillihuamanFooterHomeComponent', () => {
  let component: ServPillihuamanFooterHomeComponent;
  let fixture: ComponentFixture<ServPillihuamanFooterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServPillihuamanFooterHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServPillihuamanFooterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
