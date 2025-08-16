import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogService, NbAccordionModule } from '@nebular/theme';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { QuotationService } from '../../../../@data/services/quotation.service';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { RespQuotation } from '../../../../@data/model/quotation/resp-quotation';
import { RespProduct } from '../../../../@data/model/product/resp-product';

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbAccordionModule,
    TableDatasourceComponent,
  ],
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent extends BaseImplementation<RespQuotation> implements OnInit {
  
  quotationForm!: FormGroup;
  datas?: TreeNode<any>[] = [];
  searchButtonDisabled = true;
  isdelelete: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private quotationService: QuotationService,
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    dialogService: NbDialogService,
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.buildForm();
    this.findQuotationsProcess();
  }

  private buildForm(): void {
    this.quotationForm = this.fb.group({
      id: [''],
      contactEmail: [''],
      status: [''],
    });
  }

  /**
   * =================================================================================
   * CORRECCIÓN 1: Mapea los nombres del objeto JSON a los que usará la tabla.
   * =================================================================================
   */
  columnMapping(): { [key: string]: string } {
    return {
      id: 'ID',
      contactName: 'Cliente/Equipo', // CORREGIDO: Usamos "contactName" como clave
      contactEmail: 'Email',
      status: 'Estado',
      grandTotal: 'Total (S/.)'
    };
  }

  checkInputs(): void {
    const id = this.quotationForm.get('id')?.value || '';
    const email = this.quotationForm.get('contactEmail')?.value || '';
    const status = this.quotationForm.get('status')?.value || '';
    
    this.searchButtonDisabled = !(id || email || status);
    if (this.searchButtonDisabled) {
      this.findQuotationsProcess();
    }
  }

  /**
   * =================================================================================
   * CORRECCIÓN 2: Formatea la data recibida para que coincida con `columnMapping`.
   * =================================================================================
   */
  findQuotationsProcess(): void {
    this.spinnerService.show();
    this.quotationService.listAllQuotations().pipe(
      map(value => {
        const quotations: RespQuotation[] = value?.payload || [];
        
        // Mapeamos el JSON a una estructura plana que la tabla pueda consumir fácilmente
        const formattedData = quotations.map(q => ({
          id: q.id,
          // CORREGIDO: Extraemos "contactName" del objeto anidado "customerInfo"
          contactName: q.customerInfo?.contactName, 
          contactEmail: q.customerInfo?.contactEmail,
          status: q.status,
          grandTotal: q.totals?.grandTotal?.toFixed(2) // Usamos optional chaining y toFixed para seguridad
        }));

        // El método de la clase base convierte este array en el formato que espera la tabla
        return this.customizePropertyNames(formattedData, this.columnMapping());
      }),
      catchError(error => {
        console.error("Error fetching quotations:", error);
        this.showWErrorMessage('Error al cargar cotizaciones', 'Error de Conexión');
        return of([]);
      })
    ).subscribe(data => {
      this.datas = data;
      this.setDefaultColumns(this.datas);
      this.updateHasMorePagesT(!!(this.datas && this.datas.length > 0));
      this.spinnerService.hide();
    });
  }

  override findByparameter(): void {
    // En el futuro, aquí se pasarían los filtros al servicio
    this.findQuotationsProcess();
  }

  onNewClick(): void {
    // Navegamos a la ruta de creación. Asegúrate de que esta ruta exista en tu router.
    this.router.navigate(['/home/quotation/detail/new']);
  }

  handleEditAction(row: TreeNode<any>): void {
    const quotationId = row?.data?.ID;
    if (!quotationId) {
      this.showWarningMessage('No se pudo obtener el ID de la cotización para editar.', 'ID Inválido');
      return;
    }
    // Navegamos a la ruta de edición con el ID.
    this.router.navigate(['/home/quotation/detail', quotationId]);
  }

  deleting(event: any): void {
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: {
          ...event.data,
          typeDescription: 'QUESTION',
          description: `¿Estás seguro de eliminar la cotización de "${event.data['Cliente/Equipo']}"?`,
        },
      }
    });
  
    dialogRef.onClose.subscribe((result) => {
      if (result === 'deleteConfirmed') {
        this.handleDeleteAction(event);
      }
    });
  }
  
  handleDeleteAction(row: TreeNode<any>): void {
    const quotationId: string = row?.data?.ID;
    if (!quotationId) {
      this.showWarningMessage('No se pudo obtener el ID de la cotización para eliminar.', 'ID Inválido');
      return;
    }

    this.spinnerService.show();
    this.quotationService.deleteQuotation(quotationId).subscribe({
      next: (response) => {
        if (response.status?.success) {
          this.showSuccessMessage("Cotización eliminada con éxito", "Operación Exitosa");
          this.findQuotationsProcess(); // Recarga la lista para reflejar el cambio
        } else {
          const errorMessage =  "Ocurrió un error desconocido.";
          this.showWErrorMessage(errorMessage, 'Error al Eliminar');
        }
      },
      error: (err) => {
        const errorMessage = err.error?.status?.error?.message || "No se pudo conectar con el servidor.";
        console.error("Error deleting quotation:", err);
        this.showWErrorMessage(errorMessage, 'Error Crítico');
        this.spinnerService.hide();
      }
    });
  }
  // --- NUEVOS MÉTODOS PARA MANEJAR LA SELECCIÓN DEL AUTOCOMPLETADO ---
  onProductSelectionChange(product: RespProduct): void {
    // Cuando se selecciona un producto, puedes hacer algo con él.
    // Por ejemplo, podrías añadir un filtro por ID de producto.
    console.log('Producto seleccionado:', product);
    this.quotationForm.get('productSearch')?.setValue(product.name); // Muestra el nombre en el input
    // this.findByparameter(); // Opcional: podrías lanzar una búsqueda con este filtro
  }

  viewProduct(product: RespProduct): string {
    return product ? product.name : '';
  }
  
}