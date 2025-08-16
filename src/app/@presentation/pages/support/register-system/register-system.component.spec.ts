import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSystemComponent } from './register-system.component';

describe('RegisterSystemComponent', () => {
  let component: RegisterSystemComponent;
  let fixture: ComponentFixture<RegisterSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
