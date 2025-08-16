import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule, NbDialogService } from '@nebular/theme';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../../@common-components/table-datasource/table-datasource.component';
import { ReqTenant } from '../../../../../@data/model/tenant/req-tenant';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { TenantRepository } from '../../../../../@domain/repository/repository/tenant.repository ';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { Utils } from '../../../../../utils/utils';

@Component({
  selector: 'app-support-tenant-detail',
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
    NbDateFnsDateModule
    ,
  ],
  templateUrl: './support-tenant-detail.component.html',
  styleUrl: './support-tenant-detail.component.scss'
})
export class SupportTenantDetailComponent extends BaseImplementation<any> implements OnInit {
  tenantForm!: FormGroup;

  constructor(
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private fb: FormBuilder,
    private tenantRepository: TenantRepository,
    private router: Router,
    dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.tenantForm = this.fb.group({
      id: [''],
      name: [''],
      domain: [''],
      active: [true],
    });

    this.loadTenantData();
  }

  loadTenantData(): void {
    const tenantId = this.activatedRoute.snapshot.paramMap.get('id');
    if (tenantId && Utils.isValidObjectId(tenantId)) {
      const filters: ReqTenant = {
        id: tenantId,
        name: '',
        domain: '',
        active: true,
      };

      this.spinnerService.show();
      this.tenantRepository.listTenants(filters).subscribe({
        next: (res) => {
          const tenant = res.length > 0 ? res[0] : null;
          if (tenant) {
            this.tenantForm.patchValue(tenant);
          } else {
            console.warn('Tenant no encontrado');
          }
          this.spinnerService.hide();
        },
        error: () => {
          this.spinnerService.hide();
          this.handleErrorResponseSaveOrUpdate('Error al cargar el Tenant');
        }
      });
    }
  }

  saveTenant(): void {
    const tenant: ReqTenant = {
      ...this.tenantForm.value,
    };

    this.tenantRepository.saveTenant(tenant).subscribe({
      next: () => {
        this.showSuccessMessage('Tenant guardado correctamente', 'Éxito');
        this.router.navigate(['/support/tenant']);
      },
      error: () => {
        this.handleErrorResponseSaveOrUpdate('Error al guardar Tenant');
      }
    });
  }

  returnToList(): void {
    this.router.navigate(['/support/tenant']);
  }
}