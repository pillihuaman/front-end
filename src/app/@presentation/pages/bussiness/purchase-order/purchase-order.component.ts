import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbIconModule,
  NbDatepickerModule,
  NbDialogService,
} from '@nebular/theme';
import { NbMomentDateModule } from '@nebular/moment';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { ReqPurchaseOrder } from '../../../../@data/model/purchaseOrder/req-purchase-order.model';
import { RespPurchaseOrder } from '../../../../@data/model/purchaseOrder/resp-purchase-order.model';
import { PurchaseOrderRepository } from '../../../../@domain/repository/repository/purchase-order.repository';

@Component({
  selector: 'app-purchase-order',
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
    TableDatasourceComponent,
  ],
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.scss',
})
export class PurchaseOrderComponent extends BaseImplementation<any> implements OnInit {
  unifiedForm!: FormGroup;
  results: TreeNode<RespPurchaseOrder>[] = [];

  constructor(
    private fb: FormBuilder,
    private purchaseOrderRepository: PurchaseOrderRepository,
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private router: Router,
    dialogService: NbDialogService
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.unifiedForm = this.fb.group({
      id: [''],
      supplierId: [''],
      status: ['']
    });

    this.loadPurchaseOrderData();
  }

  loadPurchaseOrderData(): void {
    const formValue = this.unifiedForm.value as ReqPurchaseOrder;

    this.spinnerService.show();

    this.purchaseOrderRepository.listPurchaseOrders({
      ...formValue,
     // page: this.page,
    //  pagesize: this.pageSize,
    }).subscribe({
      next: (res) => {
              const rows = res?.payload || [];
        this.results = this.customizePropertyNames(rows, this.columnMapping());
        this.setDefaultColumns(this.results);
        this.updateHasMorePagesT(this.results.length > 0);
        this.spinnerService.hide();
      },
      error: () => {
        this.results = [];
        this.spinnerService.hide();
      },
    });
  }

  columnMapping(): { [key: string]: string } {
    return {
      id: 'ID',
      supplierId: 'Supplier ID',
      orderDate: 'Order Date',
      status: 'Status',
    };
  }

  override findByparameter(): void {
    this.page = 1;
    this.pageSize = 10;
    this.loadPurchaseOrderData();
  }

  onNew(): void {
    this.router.navigate(['/bussiness/purchase-order/detail', 'new']);
  }

  deleting(event: any) {
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: {
          ...event.data,
          typeDescription: 'QUESTION',
          description: event.data.Name,
        },
      },
    });

    dialogRef.onClose.subscribe((result) => {
      if (result === 'deleteConfirmed') {
        const id = event.data.ID;
        this.purchaseOrderRepository.deletePurchaseOrder(id).subscribe(() => {
          this.showSuccessMessage("Purchase Order deleted successfully", "Success");
          this.loadPurchaseOrderData();
        });
      }
    });
  }

  handleEditAction(row: TreeNode<any>) {
    
    const id = row?.data?.ID;
    if (id) {
      this.router.navigate([`/bussiness/purchase-order/detail/${id}`]);
    } else {
      console.error('ID is undefined for the row');
    }
  }
}
