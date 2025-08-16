import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// <-- CAMBIO: Importa NbAccordionModule y NbSelectModule
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogService, NbAccordionModule, NbSelectModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { ReqWarehouse } from '../../../../@data/model/Inventory/req-warehouse.model';
import { RespWarehouse } from '../../../../@data/model/Inventory/resp-warehouse.model';
import { WarehouseRepository } from '../../../../@domain/repository/repository/warehouse.repository';
import { wareHouseConfig } from '../../../../utils/values';
import { CommonRepository } from '../../../../@domain/repository/repository/common.repository';

@Component({
  selector: 'app-ware-house',
  templateUrl: './ware-house.component.html',
  styleUrl: './ware-house.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    TableDatasourceComponent,
    NbAccordionModule, // <-- CAMBIO: Añadir
    NbSelectModule,    // <-- CAMBIO: Añadir
  ]
})
export class WarehouseComponent extends BaseImplementation<any> implements OnInit {
  warehouseForm!: FormGroup;
  results: TreeNode<RespWarehouse>[] = [];

  // <-- CAMBIO: Listas para los selectores del formulario de búsqueda
  warehouseTypes: string[] = [];
  operationalStatuses: string[] = [];
  capacityUnits: string[] = [];

  constructor(
    private fb: FormBuilder,
    private repository: WarehouseRepository,
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private router: Router,
    dialogService: NbDialogService,        private commonRepository: CommonRepository
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    
    // <-- CAMBIO: FormGroup expandido con más campos de búsqueda
    this.warehouseForm = this.fb.group({
      warehouseCode: [''],
      type: [''],
      operationalStatus: [''],
      city: [''],
      country: [''],
    });

    this.loadData();
    this.loadRelatedData();
  }

  loadData(): void {
    // Filtramos solo los valores que no son nulos o vacíos para enviar una request más limpia
    const formValue = this.warehouseForm.value;
    const req = Object.keys(formValue).reduce((acc, key) => {
      if (formValue[key]) {
        acc[key] = formValue[key];
      }
      return acc;
    }, {} as Record<string, any>) as ReqWarehouse;

    this.spinnerService.show();
    this.repository.filterWarehouses(req).subscribe({
      next: (res) => {
        const rows = Array.isArray(res.payload) ? res.payload : [];
        this.results = this.customizePropertyNames(rows, this.columnMapping());
        this.setDefaultColumns(this.results);
        this.spinnerService.hide();
      },
      error: () => this.spinnerService.hide(),
    });
  }

  // <-- CAMBIO: Mapeo de columnas más completo y descriptivo
  columnMapping(): { [key: string]: string } {
    return {
            id: 'ID',
      warehouseCode: 'Código',
      type: 'Tipo',
      operationalStatus: 'Estado Operativo',
      city: 'Ciudad',
      country: 'País',
      capacity: 'Capacidad',
      capacityUnit: 'Unidad'
    };
  }

  override findByparameter(): void {
    
    this.page = 1;
    this.pageSize = 10;
    this.loadData();
  }

  onNew(): void {
    this.router.navigate(['/bussiness/warehouse/detail', 'new']);
  }

  deleting(event: any): void {
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: {
          ...event.data,
          typeDescription: 'QUESTION',
          // Usamos el código del almacén para la confirmación, es más claro
          description: `¿Estás seguro de que deseas eliminar el almacén ${event.data.Código || ''}?`,
        },
      },
    });

    dialogRef.onClose.subscribe((result) => {
      if (result === 'deleteConfirmed') {
        // <-- CORRECCIÓN CRÍTICA: Usar el `id` real del payload original, no el `ID` mapeado
        const idToDelete = event.data.ID; 
        if (idToDelete) {
          this.repository.deleteWarehouse(idToDelete).subscribe(() => {
            this.showSuccessMessage('Eliminado con éxito', 'Success');
            this.loadData();
          });
        }
      }
    });
  }

  handleEditAction(row: TreeNode<any>) {
    
    // <-- CORRECCIÓN CRÍTICA: Usar el `id` real del payload original
    const idToEdit = row?.data?.ID; 
    if (idToEdit) {
       this.router.navigate([`/bussiness/warehouse/detail/${idToEdit}`]);
    } else {
      console.error("No se pudo obtener el ID para editar.", row.data);
    }
  }

  
  private loadRelatedData(): void {
    this.spinnerService.show();
    const configType = wareHouseConfig.wareHouse_config_type;
  
    this.commonRepository.getCommonParametersByConfigType(configType).subscribe({
      next: (resp) => {
        if (resp && resp.payload) {
          // La respuesta `resp.payload` es el array que necesitamos recorrer
          resp.payload.forEach((configDoc: any) => {
  
            // CORRECCIÓN 1: Usamos `configDoc.id` en lugar de `configDoc._id`
            switch (configDoc.id) {
              case 'WAREHOUSE_TYPE':
                // CORRECCIÓN 2: El array está directamente en `configDoc.types`
                this.warehouseTypes = configDoc.types || [];
                break;
              case 'OPERATIONAL_STATUS':
                // CORRECCIÓN 2: El array está directamente en `configDoc.statuses`
                this.operationalStatuses = configDoc.statuses || [];
                break;
              case 'CAPACITY_UNIT':
                // CORRECCIÓN 2: El array está directamente en `configDoc.units`
                this.capacityUnits = configDoc.units || [];
                break;
            }
          });
        }
        this.spinnerService.hide();
      },
      error: (err) => {
        this.spinnerService.hide();
        this.showWErrorMessage('Error al cargar las opciones del formulario.', 'Error de Datos');
        console.error('Error loading warehouse configuration data:', err);
      }
    });
  }
  
}