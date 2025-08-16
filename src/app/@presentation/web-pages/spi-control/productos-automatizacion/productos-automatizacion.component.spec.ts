import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAutomatizacionComponent } from './productos-automatizacion.component';

describe('ProductosAutomatizacionComponent', () => {
  let component: ProductosAutomatizacionComponent;
  let fixture: ComponentFixture<ProductosAutomatizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosAutomatizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosAutomatizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
