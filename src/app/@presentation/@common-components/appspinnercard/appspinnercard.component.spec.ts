import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppspinnercardComponent } from './appspinnercard.component';

describe('AppspinnercardComponent', () => {
  let component: AppspinnercardComponent;
  let fixture: ComponentFixture<AppspinnercardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppspinnercardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppspinnercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
