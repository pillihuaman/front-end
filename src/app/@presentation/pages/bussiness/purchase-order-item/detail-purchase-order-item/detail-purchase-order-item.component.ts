import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbIconModule,
  NbDialogService,
} from '@nebular/theme';
import { ReqPurchaseOrderItem } from '../../../../../@data/model/purchaseOrder/req-purchase-order-item.model';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { PurchaseOrderItemRepository } from '../../../../../@domain/repository/repository/purchase-order-item.repository';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { Utils } from '../../../../../utils/utils';

@Component({
  selector: 'app-detail-purchase-order-item',
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
  ],
  templateUrl: './detail-purchase-order-item.component.html',
  styleUrl: './detail-purchase-order-item.component.scss',
})
export class DetailPurchaseOrderItemComponent extends BaseImplementation<any> implements OnInit {
  form!: FormGroup;

  constructor(
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private fb: FormBuilder,
    private repository: PurchaseOrderItemRepository,
    private router: Router,
    dialogService: NbDialogService,
    private route: ActivatedRoute
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      purchaseOrderId: [''],
      productId: [''],
      quantityOrdered: [0],
      unitCost: [0.0],
    });

    this.loadData();
  }

  loadData(): void {
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new' && Utils.isValidObjectId(id)) {
      this.spinnerService.show();
      this.repository.listItems({ purchaseOrderItemId: id, }).subscribe({
        next: (res) => {
          
          const item = Array.isArray(res?.payload) ? res.payload[0] : res.payload;
          if (item) {
            this.form.patchValue(item);
          }
          this.spinnerService.hide();
        },
        error: () => this.spinnerService.hide(),
      });
    }
  }

  save(): void {
    
    const data: ReqPurchaseOrderItem = {
      ...this.form.value,
    };
    this.repository.saveItem(data).subscribe(() => {
      this.router.navigate(['/bussiness/purchase-order-item']);
    });

  }

  return(): void {
    this.router.navigate(['/bussiness/purchase-order-item']);
  }
}
