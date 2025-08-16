import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterImageByProductComponent } from './register-image-by-product.component';

describe('RegisterImageByProductComponent', () => {
  let component: RegisterImageByProductComponent;
  let fixture: ComponentFixture<RegisterImageByProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterImageByProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterImageByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
