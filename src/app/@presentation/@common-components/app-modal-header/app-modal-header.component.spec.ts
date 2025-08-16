import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalHeaderComponent } from './app-modal-header.component';

describe('AppModalHeaderComponent', () => {
  let component: AppModalHeaderComponent;
  let fixture: ComponentFixture<AppModalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
