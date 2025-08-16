import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbIconModule,
  NbDialogService,
} from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { PurchaseOrderItemRepository } from '../../../../@domain/repository/repository/purchase-order-item.repository';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { ReqPurchaseOrderItem } from '../../../../@data/model/purchaseOrder/req-purchase-order-item.model';
import { RespPurchaseOrderItem } from '../../../../@data/model/purchaseOrder/resp-purchase-order-item.model';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';

@Component({
  selector: 'app-purchase-order-item',
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
    TableDatasourceComponent,
  ],
  templateUrl: './purchase-order-item.component.html',
  styleUrl: './purchase-order-item.component.scss',
})
export class PurchaseOrderItemComponent extends BaseImplementation<any> implements OnInit {
  unifiedForm!: FormGroup;
  results: TreeNode<RespPurchaseOrderItem>[] = [];

  constructor(
    private fb: FormBuilder,
    private repository: PurchaseOrderItemRepository,
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
      purchaseOrderId: [''],
      productId: [''],
      quantityOrdered: [''],
      unitCost: [''],
    });

    this.loadData();
  }

  loadData(): void {
    const formValue = this.unifiedForm.value as ReqPurchaseOrderItem;
    this.spinnerService.show();

    this.repository.listItems({
      ...formValue,
    }).subscribe({
      next: (res) => {
        const rows = Array.isArray(res.payload) ? res.payload : [];
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
      purchaseOrderId: 'Purchase Order',
      productId: 'Product',
      quantityOrdered: 'Quantity',
      unitCost: 'Unit Cost',
    };
  }

  override findByparameter(): void {
    this.page = 1;
    this.pageSize = 10;
    this.loadData();
  }

  onNew(): void {
    this.router.navigate(['/bussiness/purchase-order-item/detail', 'new']);
  }

  deleting(event: any): void {
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: {
          ...event.data,
          typeDescription: 'QUESTION',
          description: event.data.productId,
        },
      },
    });

    dialogRef.onClose.subscribe((result) => {
      if (result === 'deleteConfirmed') {
        const id = event.data.ID;
        this.repository.deletePurchaseOrderItem(id).subscribe(() => {
          this.showSuccessMessage('Deleted successfully', 'Success');
          this.loadData();
        });
      }
    });
  }

  handleEditAction(row: TreeNode<any>) {
    const id = row?.data?.ID;
    if (id) {
      this.router.navigate([`/bussiness/purchase-order-item/detail/${id}`]);
    }
  }
}
