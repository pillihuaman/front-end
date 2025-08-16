import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRandonImagenColorComponent } from './create-randon-imagen-color.component';

describe('CreateRandonImagenColorComponent', () => {
  let component: CreateRandonImagenColorComponent;
  let fixture: ComponentFixture<CreateRandonImagenColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRandonImagenColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRandonImagenColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
