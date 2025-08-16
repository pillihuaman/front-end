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
import { TreeNode } from '../../../../../@data/model/general/treeNode';
import { ReqInventory } from '../../../../../@data/model/Inventory/req-inventory.model';
import { RespInventory } from '../../../../../@data/model/Inventory/resp-inventory.model';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { InventoryRepository } from '../../../../../@domain/repository/repository/inventory.repository';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { ModalComponent } from '../../../../@common-components/modal/modal.component';
import { TableDatasourceComponent } from '../../../../@common-components/table-datasource/table-datasource.component';


@Component({
  selector: 'app-inventory',
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
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent extends BaseImplementation<any> implements OnInit {
  unifiedForm!: FormGroup;
  results: TreeNode<RespInventory>[] = [];

  constructor(
    private fb: FormBuilder,
    private repository: InventoryRepository,
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
      productId: [''],
      warehouseId: [''],
      reorderLevel: [''],
    });
    this.loadData();
  }



  loadData(): void {
    const formValue = this.unifiedForm.value as ReqInventory;
    this.spinnerService.show();

    this.repository.listInventories({
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
      productId: 'Product ID',
      warehouseId: 'Warehouse ID',
      reorderLevel: 'Recod Level',
      quantityInStock: 'Quiantity in Stock',
    };
  }

  override findByparameter(): void {
    this.page = 1;
    this.pageSize = 10;
    this.loadData();
  }

  onNew(): void {
    this.router.navigate(['/bussiness/inventory/detail', 'new']);
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
        this.repository.deleteInventory(id).subscribe(() => {
          this.showSuccessMessage('Deleted successfully', 'Success');
          this.loadData();
        });
      }
    });
  }

handleEditAction(row: TreeNode<any>) {
  // Corregido: Usar la propiedad 'ID' que fue mapeada.
  const id = row?.data?.ID; 
  if (id) {
    this.router.navigate([`/bussiness/inventory/detail/${id}`]);
  } else {
    console.error("No se pudo obtener el ID para editar.", row.data);
  }
}
}


