import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAndInputControlComponent } from './select-and-input-control.component';

describe('SelectAndInputControlComponent', () => {
  let component: SelectAndInputControlComponent;
  let fixture: ComponentFixture<SelectAndInputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAndInputControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAndInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
