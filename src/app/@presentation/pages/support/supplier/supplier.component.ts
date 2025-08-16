import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule, NbDialogService } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ReqSupplier } from '../../../../@data/model/supplier/req-supplier.model';
import { RespSupplier } from '../../../../@data/model/supplier/resp-supplier.model';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { SupplierRepository } from '../../../../@domain/repository/repository/supplier.repository';
import { ModalComponent } from '../../../@common-components/modal/modal.component';

@Component({
  selector: 'app-supplier',
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
    NbTimepickerModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
    TableDatasourceComponent,
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent extends BaseImplementation<any> implements OnInit {
  unifiedForm!: FormGroup;
  results: TreeNode<RespSupplier>[] = [];

  constructor(
    private fb: FormBuilder,
    private supplierRepository: SupplierRepository,
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private router: Router, dialogService: NbDialogService,
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.unifiedForm = this.fb.group({
      id: [''],
      name: [''],
      ruc: [''],
      email: [''],
      phone: [''],
    });

    this.loadSupplierData();
  }

  loadSupplierData(): void {
    const formValue = this.unifiedForm.value as ReqSupplier;

    this.spinnerService.show();

    this.supplierRepository.listSuppliers({
      ...formValue,
      page: this.page,
      pagesize: this.pageSize
    }).subscribe({
      next: (res) => {

        const rows = res || [];
        this.results = this.customizePropertyNames(rows, this.columnMapping());
        this.setDefaultColumns(this.results);
        this.updateHasMorePagesT(this.results.length > 0);
        this.spinnerService.hide();
      },
      error: () => {
        this.results = [];
        this.spinnerService.hide();
      }
    });
  }

  columnMapping(): { [key: string]: string } {
    return {
      id: 'ID',
      name: 'Name',
      ruc: 'RUC',
      address: 'Address',
      email: 'Email',
      phone: 'Phone',
      country: 'Country',
      status: 'Status',
      contacts: 'Contacts',
    };
  }

  override findByparameter(): void {
    this.page = 1;
    this.pageSize = 10;
    this.loadSupplierData();
  }

  onNewSupplier(): void {
    this.router.navigate(['/support/supplier/detail', 'new']);

  }

  deletings(event: any) {

    const dialogRef = this.openDeleteModal(event);
    dialogRef.componentRef.instance.rowData = event;
    dialogRef.componentRef.instance.deleteConfirmed.subscribe(() => {
      const id = event.data.id;
      this.supplierRepository.deleteSupplier(id).subscribe(() => {
        this.showSuccessMessage("Supplier deleted successfully", "Success");
        this.loadSupplierData();
      });
    });
  }

  deleting(event: any) {
    
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: {
          ...event.data,
          typeDescription: 'QUESTION', // Aquí agregas el campo que tu modal necesita
          description: event.data.Name, // Agrega tú manualmente
        },
      }
    });

    dialogRef.onClose.subscribe((result) => {
      if (result === 'deleteConfirmed') {
        
        const id = event.data.ID;
        this.supplierRepository.deleteSupplier(id).subscribe(() => {
          this.showSuccessMessage("Supplier deleted successfully", "Success");
          this.loadSupplierData();
        });
      }
    });
  }
  handleEditAction(row: TreeNode<any>) {
    const id = row?.data?.ID;
    console.log('Row ID:', id);
    if (id) {
      this.router.navigate([`/support/supplier/detail/${id}`]);
    } else {
      console.error('ID is undefined for the row');
    }
  }
  
  


}