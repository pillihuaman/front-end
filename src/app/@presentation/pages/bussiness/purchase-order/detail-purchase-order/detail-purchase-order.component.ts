import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbIconModule,
  NbDatepickerModule,
  NbCheckboxModule,
  NbDialogService
} from '@nebular/theme';
import { NbMomentDateModule } from '@nebular/moment';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';

import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { PurchaseOrderRepository } from '../../../../../@domain/repository/repository/purchase-order.repository';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { Utils } from '../../../../../utils/utils';
import { ReqPurchaseOrder } from '../../../../../@data/model/purchaseOrder/req-purchase-order.model';

@Component({
  selector: 'app-detail-purchase-order',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    ReactiveFormsModule,
    FormsModule,
    NbDatepickerModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
    NbCheckboxModule
  ],
  templateUrl: './detail-purchase-order.component.html',
  styleUrl: './detail-purchase-order.component.scss'
})
export class DetailPurchaseOrderComponent extends BaseImplementation<any> implements OnInit {
  purchaseOrderForm!: FormGroup;
  reqPurchaseOrder!: ReqPurchaseOrder;

  constructor(
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private fb: FormBuilder,
    private purchaseOrderRepository: PurchaseOrderRepository,
    private router: Router,
    dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.purchaseOrderForm = this.fb.group({
      id: [''],
      supplierId: [''],
      orderDate: [new Date()],
      status: ['']
    });
    this.loadPurchaseOrderData();
  }

  loadPurchaseOrderData(): void {
    const purchaseOrderId = this.activatedRoute.snapshot.paramMap.get('id');
    if (purchaseOrderId && Utils.isValidObjectId(purchaseOrderId)) {
      const filters: ReqPurchaseOrder = {
        purchaseOrderId: purchaseOrderId,
        supplierId: '',
        orderDate: new Date(),
        status: ''
      };
      this.spinnerService.show();
      this.purchaseOrderRepository.listPurchaseOrders(filters).subscribe({
        next: (res) => {
             const po = res?.payload && res.payload.length > 0 ? res.payload[0] : null;
          if (po) this.purchaseOrderForm.patchValue(po);
          this.spinnerService.hide();
        },
        error: () => this.spinnerService.hide()
      });
    }
  }

  savePurchaseOrder(): void {
    
    const po: ReqPurchaseOrder = {
      ...this.purchaseOrderForm.value
    };
    this.purchaseOrderRepository.savePurchaseOrder(po).subscribe(() => {
      this.router.navigate(['/bussiness/purchase-order']);
    });
  }

  returnToList(): void {
    this.router.navigate(['/bussiness/purchase-order']);
  }
}
