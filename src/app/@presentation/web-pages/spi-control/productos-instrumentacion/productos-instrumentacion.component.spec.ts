import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosInstrumentacionComponent } from './productos-instrumentacion.component';

describe('ProductosInstrumentacionComponent', () => {
  let component: ProductosInstrumentacionComponent;
  let fixture: ComponentFixture<ProductosInstrumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosInstrumentacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosInstrumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
