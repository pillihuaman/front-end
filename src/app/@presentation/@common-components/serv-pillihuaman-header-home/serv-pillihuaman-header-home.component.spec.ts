import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServPillihuamanHeaderHomeComponent } from './serv-pillihuaman-header-home.component';

describe('ServPillihuamanHeaderHomeComponent', () => {
  let component: ServPillihuamanHeaderHomeComponent;
  let fixture: ComponentFixture<ServPillihuamanHeaderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServPillihuamanHeaderHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServPillihuamanHeaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
