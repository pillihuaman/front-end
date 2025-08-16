import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenCatchInformationComponent } from './imagen-catch-information.component';

describe('ImagenCatchInformationComponent', () => {
  let component: ImagenCatchInformationComponent;
  let fixture: ComponentFixture<ImagenCatchInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenCatchInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenCatchInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
