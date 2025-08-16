
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

// Nebular & Third-Party Imports
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbFormFieldModule, NbSpinnerModule } from '@nebular/theme';


import { NbDialogService } from '@nebular/theme';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { SaveCommonDataReq } from '../../../../@data/model/general/common-data.model';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { CommonRepository } from '../../../../@domain/repository/repository/common.repository';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { AppModalHeaderComponent } from '../../../@common-components/app-modal-header/app-modal-header.component';

@Component({
  selector: 'app-manage-common-data',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    // Nebular Modules
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbFormFieldModule,
    NbSpinnerModule,
    // Common Components
    AppModalHeaderComponent,
  ],
  templateUrl: './manage-common-data.component.html',
  styleUrls: ['./manage-common-data.component.scss']
})
export class ManageCommonDataComponent extends BaseImplementation<any> implements OnInit {

  configForm!: FormGroup;
  isLoading = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonRepository: CommonRepository,
    // Para los mensajes de éxito/error, heredados de BaseImplementation
    spinnerService: SpinnerService,
    dialogService: NbDialogService,
    modalRepository: ModalRepository,
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Construye el formulario reactivo con sus validadores, incluyendo un validador personalizado para JSON.
   */
  private buildForm(): void {
    this.configForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3)]],
      configType: ['', [Validators.required, Validators.minLength(3)]],
      dataJson: ['', [Validators.required, this.jsonValidator]]
    });
  }

  /**
   * Validador personalizado para asegurar que el texto en el textarea es un JSON válido.
   */
  private jsonValidator(control: AbstractControl): ValidationErrors | null {
    try {
      JSON.parse(control.value);
      return null; // El JSON es válido
    } catch (e) {
      return { jsonInvalid: true }; // El JSON es inválido
    }
  }

  /**
   * Carga una configuración existente desde el backend y puebla el formulario.
   * @param id El ID del documento a cargar.
   */
  loadConfiguration(id: string): void {
    if (!id) {
      this.showWarningMessage('Por favor, ingrese un ID para cargar.', 'ID Requerido');
      return;
    }
    this.isLoading = true;
    this.commonRepository.getCommonParameter(id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response: any) => {
        if (response.payload) {
          const config = response.payload;
          this.configForm.patchValue({
            id: config.id,
            configType: config.configType,
            // Convierte el objeto 'data' a un string JSON formateado para el textarea
            dataJson: JSON.stringify(config.data, null, 2)
          });
          this.showSuccessMessage(`Configuración '${id}' cargada exitosamente.`, 'Carga Completa');
        } else {
          this.showWErrorMessage(`No se encontró ninguna configuración con el ID '${id}'.`, 'No Encontrado');
        }
      },
      error: (err: any) => {
        this.showWErrorMessage('Ocurrió un error al cargar la configuración.', 'Error de Red');
        console.error(err);
      }
    });
  }

  /**
   * Se ejecuta al enviar el formulario para guardar o actualizar la configuración.
   */
  saveConfiguration(): void {
    if (this.configForm.invalid) {
      this.configForm.markAllAsTouched();
      this.showWarningMessage('Por favor, corrija los errores en el formulario.', 'Formulario Inválido');
      return;
    }

    this.isSubmitting = true;
    
    // Construye el DTO para la petición a partir de los valores del formulario
    const requestPayload: SaveCommonDataReq = {
      id: this.configForm.value.id,
      configType: this.configForm.value.configType,
      data: JSON.parse(this.configForm.value.dataJson) // Convierte el string del textarea de nuevo a un objeto JSON
    };

    this.commonRepository.saveOrUpdateCommonData(requestPayload).pipe(
      finalize(() => this.isSubmitting = false)
    ).subscribe({
      next: (response) => {
        if (response.status?.success) {
          this.showSuccessMessage(`La configuración '${requestPayload.id}' ha sido guardada exitosamente.`, 'Guardado Correcto');
          // Opcional: Redirigir a otra página o limpiar el formulario
          // this.router.navigate(['/ruta-de-lista']); 
        } else {
          this.showWErrorMessage( 'Ocurrió un error desconocido.', 'Error al Guardar');
        }
      },
      error: (err: any) => {
        this.showWErrorMessage('Ocurrió un error de red al intentar guardar.', 'Error Crítico');
        console.error(err);
      }
    });
  }

  /**
   * Navega de vuelta a la lista principal (ajusta la ruta según tu aplicación).
   */
  returnToList(): void {
    this.router.navigate(['/support/dashboard']); // Ajusta esta ruta
  }
}