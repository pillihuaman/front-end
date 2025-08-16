import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalFooterComponent } from './app-modal-footer.component';

describe('AppModalFooterComponent', () => {
  let component: AppModalFooterComponent;
  let fixture: ComponentFixture<AppModalFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppModalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
