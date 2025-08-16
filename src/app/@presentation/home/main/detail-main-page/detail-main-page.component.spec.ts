import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMainPageComponent } from './detail-main-page.component';

describe('DetailMainPageComponent', () => {
  let component: DetailMainPageComponent;
  let fixture: ComponentFixture<DetailMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
