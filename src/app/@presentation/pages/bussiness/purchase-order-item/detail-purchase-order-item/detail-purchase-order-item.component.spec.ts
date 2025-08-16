import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPurchaseOrderItemComponent } from './detail-purchase-order-item.component';

describe('DetailPurchaseOrderItemComponent', () => {
  let component: DetailPurchaseOrderItemComponent;
  let fixture: ComponentFixture<DetailPurchaseOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPurchaseOrderItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPurchaseOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
