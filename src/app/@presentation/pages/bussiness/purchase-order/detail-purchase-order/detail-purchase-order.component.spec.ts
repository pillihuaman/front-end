import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPurchaseOrderComponent } from './detail-purchase-order.component';

describe('DetailPurchaseOrderComponent', () => {
  let component: DetailPurchaseOrderComponent;
  let fixture: ComponentFixture<DetailPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPurchaseOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
