import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbIconModule,
  NbDialogService,
  NbSelectModule
} from '@nebular/theme';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { WarehouseRepository } from '../../../../../@domain/repository/repository/warehouse.repository';
// Se importa la clase base para heredar sus métodos
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { Utils } from '../../../../../utils/utils';
import { ReqWarehouse } from '../../../../../@data/model/Inventory/req-warehouse.model';
import { RespWarehouse } from '../../../../../@data/model/Inventory/resp-warehouse.model';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { Observable } from 'rxjs';
import { wareHouseConfig } from '../../../../../utils/values';
import { CommonRepository } from '../../../../../@domain/repository/repository/common.repository';

@Component({
  selector: 'app-detail-warehouse',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,
    NebularSharedModule,NbSelectModule
  ],
  templateUrl: './detail-warehouse.component.html',
  styleUrls: ['./detail-warehouse.component.scss']
})
export class DetailWarehouseComponent extends BaseImplementation<RespWarehouse> implements OnInit {

  warehouseForm!: FormGroup;
  isEditMode = false;
  warehouseTypes: string[] = [];
  operationalStatuses: string[] = [];
  capacityUnits: string[] = [];

  // For <nb-autocomplete>
  allManagers: any[] = []; // This will hold the full list of managers fetched from the API
  filteredManagers$!: Observable<any[]>;

  constructor(
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    dialogService: NbDialogService,
    private fb: FormBuilder,
    private warehouseRepository: WarehouseRepository,
    private router: Router,
    private activatedRoute: ActivatedRoute,
        private commonRepository: CommonRepository
  ) {
    // Se pasa los servicios requeridos al constructor de la clase base
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.initForm();
    this.checkRouteForEditMode();
    this.loadRelatedData();
  }
/*
  private initForm(): void {
    this.warehouseForm = this.fb.group({
      id: [null],
      warehouseCode: ['', Validators.required],
      type: ['', Validators.required],
      operationalStatus: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
      capacityUnit: ['', Validators.required],
      dockDoors: [null],
      street: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', ''],
      country: ['', Validators.required],
      addressDescription: [''],
      mainPhoneNumber: ['', Validators.required],
      mainEmail: ['', [Validators.required, Validators.email]],
      managerId: [null, ''],
          managerName: [null,''],
    });
  }*/


  private initForm(): void {
  this.warehouseForm = this.fb.group({
    id: [null],
    // --- Valores de ejemplo para que el formulario sea válido ---
    warehouseCode: ['WH-DEMO-001', Validators.required],
    type: ['CENTRO_DISTRIBUCION', Validators.required],
    operationalStatus: ['OPERATIVO', Validators.required],
    capacity: [1000, [Validators.required, Validators.min(1)]],
    capacityUnit: ['PALETAS', Validators.required],
    dockDoors: [10],
    street: ['Av. Principal 123', Validators.required],
    addressLine2: ['Piso 2, Oficina B'],
    city: ['Lima', Validators.required],
    state: ['Lima', Validators.required],
    postalCode: ['LIMA 01', Validators.required], // ** SINTAXIS CORREGIDA Y VALOR AÑADIDO **
    country: ['Perú', Validators.required],
    addressDescription: ['Entrada por el portón azul'],
    mainPhoneNumber: ['+51987654321', Validators.required],
    mainEmail: ['contacto@demo.com', [Validators.required, Validators.email]],
    managerId: [null], // ** SINTAXIS CORREGIDA Y VALOR AÑADIDO **
    managerName: ['James Bond'], // ** SINTAXIS CORREGIDA Y VALOR AÑADIDO **
  });
}

// En detail-warehouse.component.ts

private checkRouteForEditMode(): void {
  
  const warehouseId = this.activatedRoute.snapshot.paramMap.get('id');

  if (warehouseId && Utils.isValidObjectId(warehouseId)) {
    this.isEditMode = true;
    const filters: Partial<ReqWarehouse> = { id: warehouseId };
    this.spinnerService.show();

    this.warehouseRepository.filterWarehouses(filters as ReqWarehouse).subscribe({
      next: (res) => {
        const wh = res?.payload?.length > 0 ? res.payload[0] : null;
        if (wh) {
          // --- SOLUCIÓN: Procesar los datos antes de hacer patchValue ---

          // 1. Mapeamos el nombre del manager
          const managerName = wh.managerFullName || '';

          // 2. Creamos un objeto limpio para parchear, manejando los valores nulos
          const warehouseData = {
            ...wh,
            // Si un campo requerido es null, lo convertimos a string vacío
            street: wh.street || '',
            city: wh.city || '',
            postalCode: wh.postalCode || '',
            country: wh.country || '',
            mainPhoneNumber: wh.mainPhoneNumber || '',
            mainEmail: wh.mainEmail || '',
            managerId: wh.managerId || '',
            managerName: managerName // Usamos el nombre mapeado
          };

          // 3. Ahora parcheamos con los datos limpios
          this.warehouseForm.patchValue(warehouseData);

        } else {
          this.showWarningMessage('No se encontró un almacén con el ID proporcionado.', 'No Encontrado');
          this.returnToList();
        }
        this.spinnerService.hide();
      },
      error: (err) => {
        this.spinnerService.hide(); // <-- Mover aquí para que se oculte en caso de error
        this.showWErrorMessage('Error al cargar los datos del almacén.', 'Error de Carga');
        console.error(err);
      }
    });
  }
}



saveWarehouse(): void {
  
  if (this.warehouseForm.invalid) {
    this.warehouseForm.markAllAsTouched();
    this.findInvalidControls(); // <--- AÑADE ESTA LÍNEA PARA DEPURAR
    this.showWarningMessage('Por favor, completa todos los campos requeridos.', 'Formulario Incompleto');
    return;
  }
    const warehouseToSave: ReqWarehouse = this.warehouseForm.value;
    this.spinnerService.show();

    this.warehouseRepository.saveWarehouse(warehouseToSave).subscribe({
      next: () => {
        const message = `Almacén ${this.isEditMode ? 'actualizado' : 'creado'} con éxito.`;
        // Se usa el método heredado para mensajes de éxito
        this.showSuccessMessage(message, 'Operación Exitosa');
        this.returnToList();
      },
      error: (err) => {
        // Se intenta usar el manejador de errores de validación de la clase base
        // que asigna errores específicos a cada campo del formulario.
        this.handleErrorResponseSaveOrUpdate(err);

        // Como fallback, si el error no es de validación (ej. error de red),
        // se muestra un mensaje de error genérico.
        if (!err.error?.data?.payload) {
          this.showWErrorMessage('Ocurrió un error inesperado al guardar.', 'Error');
        }
        console.error(err);
      }
    });
  }

  returnToList(): void {
    this.router.navigate(['/bussiness/warehouse']);
  }

    openAddressModal() {
    // This is a placeholder for your modal logic
    console.log("Opening address search modal...");
    // const dialogRef = this.dialogService.open(AddressSearchModalComponent);
    // dialogRef.onClose.subscribe(address => {
    //   if (address) {
    //     this.warehouseForm.patchValue({
    //       street: address.street,
    //       city: address.city,
    //       state: address.state,
    //       postalCode: address.postalCode,
    //       country: address.country,
    //     });
    //   }
    // });
    
    // For demonstration, let's patch some dummy data
    this.showSuccessMessage("Address selected! (Demo)", "Success");
    this.warehouseForm.patchValue({
      street: '123 Innovation Drive',
      city: 'Palo Alto',
      state: 'CA',
      postalCode: '94304',
      country: 'USA'
    });
  }

    onManagerSelected(manager: any) {
    // When a manager is selected from the autocomplete,
    // patch their ID into the actual form control for saving.
   // this.warehouseForm.get('managerId')?.setValue(manager.id);
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


findInvalidControls() {
  const invalid = [];
  const controls = this.warehouseForm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      invalid.push(name);
    }
  }
  console.log('--- FORMULARIO INVALIDO ---');
  console.log('Controles inválidos:', invalid);
  console.log('Estado del formulario:', this.warehouseForm.status);
  console.log('Valores del formulario:', this.warehouseForm.value);
  return invalid;
}
}