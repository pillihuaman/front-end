import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule, NbDialogService } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ReqTenant } from '../../../../@data/model/tenant/req-tenant';
import { RespTenant } from '../../../../@data/model/tenant/resp-tenant';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { TenantRepository } from '../../../../@domain/repository/repository/tenant.repository ';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';

@Component({
  selector: 'app-support-tenant',
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
    TableDatasourceComponent
],
  templateUrl: './support-tenant.component.html',
  styleUrl: './support-tenant.component.scss'
})

@Component({
  selector: 'app-support-tenant',
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
  templateUrl: './support-tenant.component.html',
  styleUrl: './support-tenant.component.css',
})
export class SupportTenantComponent extends BaseImplementation<any> implements OnInit {
  unifiedForm!: FormGroup;
  results: TreeNode<RespTenant>[] = [];

  constructor(
    private fb: FormBuilder,
    private tenantRepository: TenantRepository,
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private router: Router,
     dialogService: NbDialogService,
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.unifiedForm = this.fb.group({
      id: [''],
      name: [''],
      domain: [''],
      active: [true],
    });

    this.loadTenantData();
  }

  loadTenantData(): void {
    const formValue = this.unifiedForm.value as ReqTenant;
    this.spinnerService.show();
    this.tenantRepository.listTenants({
      ...formValue,
    }).subscribe({
      next: (res) => {
        this.results = this.customizePropertyNames(res || [], this.columnMapping());
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
      name: 'Name',
      domain: 'Domain',
      active: 'Active',
    };
  }

  override findByparameter(): void {
    this.page = 1;
    this.pageSize = 10;
    this.loadTenantData();
  }

  onNewTenant(): void {
    this.router.navigate(['/support/tenant/detail', 'new']);
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
        this.tenantRepository.deleteTenant(id).subscribe(() => {
          this.showSuccessMessage('Tenant deleted successfully', 'Success');
          this.loadTenantData();
        });
      }
    });
  }

  handleEditAction(row: TreeNode<any>) {
    const id = row?.data?.ID;
    if (id) {
      this.router.navigate([`/support/tenant/detail/${id}`]);
    }
  }
}
