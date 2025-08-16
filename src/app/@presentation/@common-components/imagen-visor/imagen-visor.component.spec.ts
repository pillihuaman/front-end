import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenVisorComponent } from './imagen-visor.component';

describe('ImagenVisorComponent', () => {
  let component: ImagenVisorComponent;
  let fixture: ComponentFixture<ImagenVisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenVisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenVisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
